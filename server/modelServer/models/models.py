import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
from prophet import Prophet
import numpy as np
from sklearn.metrics import mean_squared_error, mean_absolute_percentage_error
import datetime


def get_stock_data(Stock, interval):
    symbol = Stock
    start_date = "2010-01-01"
    end_date = datetime.date.today()

    data = yf.download(symbol, start=start_date, end=end_date, interval=interval)
    data["Date"] = pd.date_range(start="2010-01-01", periods=len(data), freq="M")
    data.set_index(pd.DatetimeIndex(data['Date'], freq='M'), inplace=True)

    formatted_dates = []

    for dates in data['Date']:
        date_obj = datetime.datetime.strptime(dates, "%a %d %b %Y %H:%M:%S %Z")
        formatted_date = date_obj.strftime("%Y-%m-%d")
        formatted_dates.append(formatted_date)
    
    data["Date"] = formatted_dates

    
    # Convert each column to a dictionary with date as key and value as an array
    open_data = {"Open": data["Open"].to_list()}
    high_data = {"High": data["High"].to_list()}
    low_data = {"Low": data["Low"].to_list()}
    close_data = {"Close": data["Close"].to_list()}
    date = {"Date": data["Date"].to_list()}

    return open_data, high_data, low_data, close_data, date  # Return each column as an object key with values as an array


def Model(StockHeading):
    stockData = get_stock_data("AAPL")
    df = pd.DataFrame(stockData)
    df["ds"] = pd.date_range(start="2010-01-01", periods=len(df), freq="M")
    df.set_index(pd.DatetimeIndex(df['ds'], freq='M'), inplace=True)

    df.plot(x="ds", y=StockHeading, kind="line", legend=True, figsize=(10, 5), title="Stock Data Plot", color="orange")

    split_date = "2022-12-01"

    test_set = df.loc[df.index <= split_date].copy()
    train_set = df.loc[df.index > split_date].copy()

    test_set["y"] = test_set[StockHeading]

    new_df = pd.DataFrame({"ds": test_set["ds"], "y": test_set["y"]})

    model = Prophet()

    model_fit = model.fit(new_df)

    future = model_fit.make_future_dataframe(periods=len(train_set))

    forecast = model_fit.predict(future)
    
    print(mean_absolute_percentage_error(y_true=df[StockHeading], y_pred=forecast["yhat"]))

    model_fit.plot(forecast)
    model.plot_components(forecast)

    plt.show()


    return model_fit


def Predict(StockHeading):
    stockData = get_stock_data("AAPL")
    df = pd.DataFrame(stockData)
    df["ds"] = pd.date_range(start="2010-01-01", periods=len(df), freq="M")
    df.set_index(pd.DatetimeIndex(df['ds'], freq='M'), inplace=True)

    new_df = pd.DataFrame({"ds": df["ds"], "y": df[StockHeading]})

    model = Prophet()

    model_fit = model.fit(new_df)

    future = model_fit.make_future_dataframe(periods=12)

    forecast = model_fit.predict(future)

    print(mean_squared_error(y_true=df[StockHeading], y_pred=forecast["yhat"]))

    model_fit.plot(forecast)
    model.plot_components(forecast)

    plt.show()