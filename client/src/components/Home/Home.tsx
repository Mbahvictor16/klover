import { Link } from "react-router-dom"
import mainBg from "../../assets/main.jpeg"
// import Plot from "react-plotly.js"
import { useEffect, useState } from "react"
import axios from "axios"

const Home = () => {

    const [data, setData]= useState<any>()

    useEffect(() => {
        async function getData() {

            const d =  await axios.get("http://127.0.0.1:5000/")
            const res = await d.data

            setData(res)
            console.log(data);
            
        }

        getData()
    }, [])
  
  return (
    <main className="home">
        <section>
            <div className="intro-title">
                <h1>
                    Get Over 80% accurate Perdiction of the stock market.
                </h1>

                <div className="link">
                    <Link to="stocks" className="btn register">View Stocks</Link>
                </div>
            </div>

            <div className="intro-bg">
                <div className="intro-img">
                    <img src={mainBg} alt="" />
                </div>
            </div>
        </section>
    </main>
  )
}

export default Home