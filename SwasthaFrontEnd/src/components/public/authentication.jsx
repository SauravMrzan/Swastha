// import React, { lazy, Suspense } from 'react';
// import { useLocation } from 'react-router-dom';

// // Lazy-loaded components
// const Signup = lazy(() => import('../public/Signup.jsx'));
// const AuthHeader = lazy(() => import('../public/Header.jsx'));
// const Foot = lazy(() => import('./public/Footer.jsx'));
// const Landing = lazy(()=>import('../public/LandingPage.jsx'));

// function Authentication({setToken}) {
//     const location = useLocation();
  
//     return (
//       <Suspense fallback={<div>Loading...</div>}>
//           <AuthHeader />
          
//         {
//         location.pathname==='/'?(
//             <>
//             <Landing/>
//             </>
//         ):location.pathname === '/signup' ? (
//           <>
//             <Signup />
//           </>
//         ): (
//             <div>404 Page Not Found</div>
//           )}
//           <Foot></Foot>
//         </Suspense>
//       );
//     }
    
//     export default Authentication;