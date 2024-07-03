const Login = () =>{


    return(
        <div className="h-screen w-screen border border-1 border-green-700
        flex flex-row justify-center items-center">
            <div className="h-[40%]  w-[70%] absolute border border-red-300 flex flex-wrap justify-center items-center ">
                <div className="relative top-[-50px] h-[160%] w-[40%] border border-yellow-500 bg-white">
                
                </div>
                <div className="relative top-[-50px] h-[160%]  w-[40%] border border-red-500 bg-white">
                <h1 className="font-500 text-xl text-Green">Don't Have an account?</h1>
                    <button>SignUp</button>
                </div>
            </div>
        </div>
    )
}

export default Login