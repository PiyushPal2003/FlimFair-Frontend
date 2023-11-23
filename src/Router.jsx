import { useState, createContext } from 'react';
import Homescreen from './Homescreen';
import SignUp from './SignUp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Moviedetail from './Moviedetail';
import Profile from './Profile';
import Wishlist from './Wishlist';
import ProdHouseDetails from './ProdHouseDetails';
import Pixar from './Pixar';
import Marvel from './Marvel';
import StarWars from './Starwar';

const UserContext = createContext();

function Home(){
    const [info, setInfo] =  useState(false);
    const [user, setUser] = useState("");

return(
    <div>
        <UserContext.Provider value={{ user, setUser}}>

        <Router>
            <Routes>
            
            {info ? (<Route exact path='/' element={<Homescreen />} />) : (
            <Route exact path='/' element={<SignUp info={info} setInfo={setInfo} />} /> )}

            {info ? (<Route exact path='/details/:id' element={<Moviedetail />} />) : (<Route exact path='/' element={<SignUp info={info} setInfo={setInfo} />} />)}

            {info ? (<Route exact path='/profile' element={<Profile info={info} setInfo={setInfo} />} />) : (<Route exact path='/' element={<SignUp info={info} setInfo={setInfo} />} />)}

            {info ? (<Route exact path='/wishlist' element={<Wishlist />} />) : (<Route exact path='/' element={<SignUp info={info} setInfo={setInfo} />} />)}

            {info ? (<Route exact path='/studio/Disney' element={<ProdHouseDetails />} />) : (<Route exact path='/' element={<SignUp info={info} setInfo={setInfo} />} />)}

            {info ? (<Route exact path='/studio/Pixar' element={<Pixar />} />) : (<Route exact path='/' element={<SignUp info={info} setInfo={setInfo} />} />)}

            {info ? (<Route exact path='/studio/Marvel' element={<Marvel />} />) : (<Route exact path='/' element={<SignUp info={info} setInfo={setInfo} />} />)}

            {info ? (<Route exact path='/studio/StarWars' element={<StarWars />} />) : (<Route exact path='/' element={<SignUp info={info} setInfo={setInfo} />} />)}

            {/* <Route exact path='/wishlist' element={<Wishlist/>} /> */}

            </Routes>
        </Router>

        </UserContext.Provider>
    </div>
)
}

export default Home;
export {UserContext};