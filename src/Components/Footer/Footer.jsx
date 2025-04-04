import React from "react";
import style from "./footer.module.css";
import logo from "../../assets/image/evangadi-logo-footer.png";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from "react-router-dom"; // I

const Footer = () => {
  return (
    <section className={style.footer_container}>
      {/* Wrapper for the footer logo and social media links */}
      <section className={style.links_wrapper}>
        <div className={style.logo_container}>
          {/* Displaying the footer logo */}
          <img className={style.footer_logo} src={logo} alt="evangadi-logo" />

          {/* Social media links: Facebook, Instagram, YouTube */}
          <div className={style.socialMedia_links}>
            <Link to="https://www.facebook.com/evangaditech" target="_blank">
              <CiFacebook size={40}/>
            </Link>
            <Link to="https://www.instagram.com/evangaditech/" target="_blank">
              <FaInstagram size={35}/>
            </Link>
            <Link to="https://www.youtube.com/@EvangadiTech" target="_blank">
              <IoLogoYoutube  size={35}/>
            </Link>
          </div>
        </div>

        {/* Useful links and contact information section */}
        <div className={style.footer_links}>
          {/* Useful Links List */}
          <div>
            <ul className={style.useful_links}>
              <li>Useful Links</li>
              <li>
                <Link to="HowItWorks">How it works</Link>
              </li>
              <li>
                <Link to="">Terms of Service</Link>
              </li>
              <li>
                <Link to="">Privacy policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className={style.contact}>
            <ul>
              <li className={style.title}>Contact Info</li>
              <li>Evangadi Networks</li>
              <li>support@evangadi.com</li>
              <li>+1-202-386-2702</li>
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Footer;