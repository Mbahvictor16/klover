import axios from "axios"
import { useEffect, useState, Suspense } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Plot from "react-plotly.js"
import ErrorBoundary from "../ErrorBoundary/Errorboundary"
import getDate from "../../hooks/getDate"

import "./stock.module.css"
import { useCookies } from "react-cookie"

const Stock = () => {
    const [data, setData]= useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<{message: string | null}>({message: null})
    const { dateArray } = getDate()

    console.log(dateArray);
    
    const [cookie, __] = useCookies()
    const navigate = useNavigate()
    const [stock, setStock] = useState<{stock: string; timeframe: string}>({
        stock: "AAPL",
        timeframe: "1mo"
    })
    const [_, setStockQuery] = useSearchParams(stock)

    useEffect(() => {

        if (!cookie.user) {
          return navigate("/auth/login")
        }
    }, [])

    function setStockParams(event: any) {
        
        setStock(prevStockQuery => {
            return {
                ...prevStockQuery,
                [event.target.name]: event.target.innerText
            }
        })

        setStockQuery(prevStockQuery => {
            return {
                ...prevStockQuery,
                [event.target.name]: event.target.innerText
            }
        })
        
    }
    
    

    useEffect(() => {
        async function getData() {
            setLoading(true)
            try {
                const d =  await axios.post("http://127.0.0.1:5000/", stock)
                const res = await d.data.response
                
                if (!res.ok) {
                    setError({ message: "error"})
                }

                setData(res)
            } catch (error: any) {
                setError(error)
                
            }
            setLoading(false)
        }

        getData()
    }, [stock])

   
    if (error) {
        return <ErrorBoundary fallback={<h1>There was an error</h1>} children={<h1> No error</h1>}/>
    }



  return (
    <main>
        <section>
            <aside>
                <h1 style={{marginBlock: "36px"}}>STOCKS</h1>
                <ul style={{textAlign: "center", marginInline: "auto", listStyle: "none", marginTop: "24px"}}>
                    <li>
                        <button onClick={setStockParams} name="stock">AAPL</button>
                    </li>
                    <li>
                        <button onClick={setStockParams} name="stock">MSFT</button>
                    </li>
                    <li>
                        <button onClick={setStockParams} name="stock">TSLA</button>
                    </li>
                </ul>
            </aside>

            <ErrorBoundary fallback={<div style={{textAlign: "center"}}>Error</div>}>
                <Suspense fallback={<div style={{textAlign: "center"}}>Loading...</div>}>
                    <div className="plot">
                        <div>
                            {
                                data !== null && (
                                    <Plot
                                        data={[
                                            {
                                                x: dateArray, 
                    
                                                close: data[3].Close, 
                                                
                                                decreasing: {line: {color: 'red'}}, 
                                                
                                                high: data[1].High, 
                                                
                                                increasing: {line: {color: 'green'}}, 
                                                
                                                line: {color: 'rgba(31,119,180,1)'}, 
                                                
                                                low: data[2].Low, 
                                                
                                                open: data[0].Open, 
                                                
                                                type: 'candlestick', 
                                                xaxis: 'x', 
                                                yaxis: 'y'
                                            },
                                        ]}
                                        layout={{
                                            paper_bgcolor: '#111222',
                                            plot_bgcolor: '#111222',
                                            dragmode: 'turntable',
                                            title: `${stock.stock} data`, 
                                            margin: {
                                                r: 10, 
                                                t: 72, 
                                                b: 40, 
                                                l: 60
                                            },
                                            showlegend: false, 
                                            xaxis: {
                                                autorange: false, 
                                                domain: [0, 1], 
                                                range: ['2010-01-01 12:00', '2024-01-01 12:00'], 
                                                rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']}, 
                                                title: 'Date', 
                                                type: 'date'
                                            }, 
                                            yaxis: {
                                                autorange: true, 
                                                domain: [0, 1], 
                                                range: [114.609999778, 137.410004222], 
                                                type: 'linear'
                                            },
                                        }}

                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            overflowX: "auto",
                                            background: "#000"
                                        }}
                                    />
                                )
                            }
                        </div>
                    </div>
                </Suspense>
            </ErrorBoundary>
        </section>
    </main>
    
  )
}

export default Stock