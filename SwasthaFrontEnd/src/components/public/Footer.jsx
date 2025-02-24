// import React, { useEffect, useState } from 'react';
// import '../css/Footer.css';

// function Footer(){
//     const [showAboutSection, setShowAboutSection] = useState(false);
//      useEffect(() => {
//         const timers = [];
//     timers.push(setTimeout(() => setShowAboutSection(true), 500));
//     return () => timers.forEach(timer => clearTimeout(timer));
// }, []);
//     return (
//         <footer>
//             {showAboutSection && (
//         <div className="footer">
//             <div className="footer__container">
//             <div className="mid-foot">
//                 <h2>Swastha</h2>
//                 <ul>
//                     <li>Swastha is a user-friendly online platform designed to simplify</li>
//                     <li> healthcare appointment bookings. It connects patients with doctors, hospitals, </li>
//                     <li>and healthcare specialists, allowing seamless scheduling of consultations, whether in-person or virtual.</li>
//                 </ul>
//             </div>
//             <div className="Touch">
//                 <h2>
//                     Contact Us:
//                 </h2>
//                 <ul>
//                     <li>Phone: 01-4537385</li>
//                     <li>Address: Kathmandu, Nepal</li>
//                     <li>Mail Us: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=maharjansaurav2002@gmail.com"
//                 target="_blank"
//                 rel="noopener noreferrer">Swastha</a></li>
//                 </ul>
//             </div>
//             </div>

//         </div>
//             )}
//         </footer>
//     );
// }

// export default Footer;
