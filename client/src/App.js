import './App.css';
import Header from './Components/Header';
import Feeds from './Components/Feeds';
import Features from './Components/Features';
import { connect } from "react-redux"
import PopUpCreate from "./Components/PopUpCreate";

function App(props) {
  return (
    <div>
      {props.popUp===false?(<div>
        <Header />
        <Features />
        <div className='flex justify-center'>
          <Feeds />
        </div>
      </div>):(<PopUpCreate />)}
    </div>
  );
}

const mapStateToProps=(state)=>{
  return {popUp:state.popUp.popUp}
}


export default connect(mapStateToProps)(App);
