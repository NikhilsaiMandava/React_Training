import './Loader.css';

function LoaderComponent() {
    return (
        <div className="loader_main_div">
            <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <h1 style={{color:'blue',fontWeight:'bolder',fontSize:'20px'}}>Loading...</h1>
            </div>
            <div className="loader_bg_div"></div>
        </div>
    )
}

export default LoaderComponent;