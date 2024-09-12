import Image from "next/image";
import "./style.css"

const HomePage = ()  => {
    return (
        <div className="wrapper">
        <nav className="navbar">
        <Image
          className="dark:invert"
          src="https://skillhat.ca/wp-content/uploads/2023/06/skillhat-whitelogo.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
            
            <ul>
                <li><a href="active">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                 <li><a href="#">Feedback</a></li>
             </ul>
         </nav>
        <div className="center">
            <h1>Welcome to our page</h1>
            <h3> A safe, supportive, compassionate environment made with love.</h3>
            <div className="buttons">
                <button>Explore more</button>
                 <button className="btn">Subscribe</button>
            </div>
         </div>
     </div>
    )

}
export default HomePage