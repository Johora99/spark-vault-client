import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <div className="glassy-bg" style={{borderRadius:'0px'}}>
      <div className="container w-11/12 mx-auto">
      <div className="flex flex-col lg:flex-row gap-5 justify-between pt-20">
      <div>
            <h3 className="text-3xl font-bold text-white" style={{textShadow: '8px 5px 2px rgba(97,67,133,0.6)' }}>
              <span className="color-text">Spark</span>Vault
            </h3>
          </div>
      
        <div>
          <h4 className="text-xl font-medium color-text mb-3">About Company</h4>
          <ul className="*:text-white">
            <li><Link>Contact Us</Link></li>
            <li className="my-1"><Link>Terms & Condition</Link></li>
            <li><Link>Privacy & Policy</Link></li>
            <li className="my-1"><Link>Candidate Listing</Link></li>
          </ul>
        </div>
        <div>
            <h4 className="text-xl font-medium color-text mb-3">For Users</h4>
            <ul className="*:text-white">
            <li><Link to='/'>Home</Link></li>
            <li className="my-1"><Link to='/allProducts'>Products</Link></li>
            <li><Link to='/logIn'>Get a start</Link></li>
            <li className="my-1"><Link>Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-medium color-text mb-3">Quick Start</h4>
          <ul className="*:text-white">
  <li><Link to='/dashBoard/addProduct'>Submit a Product</Link></li>
  <li className="my-1"><Link>Product Pricing</Link></li>
  <li><Link>Featured Products</Link></li>
  <li className="my-1"><Link>User Dashboard</Link></li>
</ul>

        </div>
      </div>
      <div>
        <div className="flex items-center justify-between gap-5">
        <div className="flex-grow border-[1px] border-appleGreen"></div>
        <div className="lg:w-44 w-32 lg:h-44 h-32 border-[1px] border-appleGreen rounded-full relative">
          <h2 className="text-2xl lg:text-3xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center" style={{textShadow: '8px 5px 2px rgba(97,67,133,0.6)' }}><span className="color-text">Spark</span> <span className="text-white">Vault</span></h2>
        </div>
        <div className="flex-grow border-[1px] border-appleGreen"></div>
        </div>
        <div className="py-5">
          <p className="text-white">©Copyright 2024 <span className="text-TealBlueGreen">Web Nest</span> </p>
        </div>
      </div>
      </div>
    </div>
  )
}
