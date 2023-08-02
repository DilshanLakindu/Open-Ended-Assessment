
import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AddCategory from './Pages/AddCategory';
import SubCategory from './Components/SubCategory';
import SubCategoryList from './Pages/SubCategoryList';
import AddProduct from './Pages/AddProduct';
import ProductList from './Pages/ProductList';
import UpdateProduct from './Pages/UpdateProduct';

function App() {
  return (
    < >
    <NavBar/>
    <Router>
          <Routes>
          <Route exact path="/" element={<Home/>} />
          </Routes>

          <Routes>
            <Route path='/category/add' element={<AddCategory/>} />
          </Routes>

          <Routes>
            <Route path='/subCategory/list/:Sid' element={<SubCategoryList/>} />
          </Routes>

          <Routes>
            <Route path='/Product/add' element={<AddProduct/>} />
          </Routes>

          <Routes>
          <Route path='/subCategory/list/:Sid/:Pid' element={<ProductList/>}/>
          <Route path='/Product/edit/:id' element={<UpdateProduct />} />
          <Route path='/subCategory/list/:Sid/:Pid/:PEid' element={<UpdateProduct/>}/>
          </Routes>
      </Router>
    </>
  );
}

export default App;
