import "./footer.styles.css";

const Footer = () => {

    return (
        <footer className="footer-container">

            <div className="footer-main">


                <div className="icons">
                    <a href="https://github.com/raiesbo" target="_blank" rel="noreferrer" title="GitHub"><i class="fab fa-github fa-lg"></i></a>
                    <a href="https://codepen.io/raiesbo" target="_blank" rel="noreferrer" title="CodePen"><i class="fab fa-codepen fa-lg"></i></a>
                    <a href="https://www.freecodecamp.org/raiesbo" target="_blank" rel="noreferrer" title="freeCodeCamp"><i class="fab fa-free-code-camp fa-lg"></i></a>
                    <a href="https://www.linkedin.com/in/raiesbo/" target="_blank" rel="noreferrer" title="LinkedIn"><i class="fab fa-linkedin-in fa-lg"></i></a>
                    <a href="" target="_blank" rel="noreferrer" title="Archive"><i class="fas fa-archive"></i></a>
                    <a href="" target="_blank" rel="noreferrer" title="Curriculum Vitae"><i class="far fa-file fa-lg"></i></a>
                </div>

                <h5>
                    Built and Designed with <span className="enfas">React, HTML & CSS</span> by <br/>
                    <a href="https://raimonespasa.com/" title="personal website" target="_blank" rel="noreferrer"><span className="enfas">Raimon Espasa Bou</span></a> 
                </h5>


            </div>


        </footer> 
        
    )
}


export default Footer;