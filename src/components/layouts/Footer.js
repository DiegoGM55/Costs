import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

import Container from "./Container";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>

      <Container>
        <div>
          <p>
            <span>Copyrights </span> &copy; 2022 Citroen
          </p>
        </div>
        <div>
          <ul className={styles.list}>
            <li>
              <FaFacebook />
            </li>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaLinkedin />
            </li>
            <li>
              <FaTwitter />
            </li>
          </ul>
        </div>
      </Container>
      
    </footer>
  );
}

export default Footer;
