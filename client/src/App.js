import './App.css';
import Header from './Components/Header';
import Feeds from './Components/Feeds';
import Features from './Components/Features';
import { connect } from "react-redux"
import PopUpCreateClose from './Components/PopUpCreateClose';
import Register from './Components/Register';

function App(props) {
  return(<Register />)
  // return (
  //   <div>
  //     {props.popUp===false?(<div>
  //       <Header />
  //       <Features />
  //       <div className='flex justify-center'>
  //         <Feeds />
  //       </div>
  //     </div>):(<PopUpCreateClose />)}
  //   </div>
  // );
}

const mapStateToProps=(state)=>{
  return {popUp:state.popUp.popUp}
}

export default connect(mapStateToProps)(App);
