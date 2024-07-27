

function App(props) {
  // const [cookies,removeCookie] = useCookies([]);
  // const navigate=useNavigate()

  // useEffect(() =>{
  //   const verifyUser=async()=>{
  //     if(!cookies.login){
  //       navigate("/login")
  //     }else{
  //       const {data}=await axios.post("http://localhost:8000/",{},{withCredentials:true})  
  //       if(!data.status){
  //         removeCookie("login")
  //         navigate("/login")
  //       }
  //     }
  //   }    
  //   verifyUser()
  // },[])

  return (
    <div className='flex justify-between'>
      <div className='flex flex-col'>
        <h1>Hi </h1>
        <h1 className='text-4xl mt-4'>TravelSaga</h1>
        {/* <Features /> */}
      </div>

      {/* <Feeds /> */}
      {/* <SlideSearch /> */}
      <h1>G</h1>
    </div>
  );
}

// const mapStateToProps=(state)=>{
//   return {
//     popUp:state.popUp.popUp,
//     user:state.auth.user
//   }
// }

// const mapStateToProps = (state) =>{
//   return {
//       auth:state.auth.user
//   }
// }

export default App;
