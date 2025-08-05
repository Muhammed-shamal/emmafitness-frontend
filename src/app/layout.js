
// import { Gothic_A1 } from 'next/font/google';
import '../../theme/global.css'
import Currency from '../components/currency'
import Header from '../components/global/Header';
import Footer from '../components/global/footer/Footer';
import { Providers } from '../utility/redux/provider'
import NavMenu from '../components/global/Menu';
import { GoogleTagManager } from '@next/third-parties/google'
import { WhatsAppOutlined } from '@ant-design/icons';
import { Toaster } from 'react-hot-toast';
import BottomHeader from '../components/global/BottumHeader'
import basicData from '../utility/basicDatas';
import ToastListener from '../components/ToastListner'

// const inter = Gothic_A1({ subsets: ['latin'], weight: ['400'] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg" href="/logos/emma_logo-02.svg" />
      </head>
      <body className={` text-gray-700 relative`}>
        {/* <!-- Google Tag Manager (noscript) --> */}
        {/* <GoogleTagManager gtmId='' /> */}


        <Providers>
          <Toaster position="top-right" />
          <ToastListener />
          <header className='sticky top-0 z-50'>
            <Currency />
            <Header />
          </header>
          {/* <NavMenu /> */}
          <BottomHeader/>
          {children}

          <div className='fixed bottom-5 left-5 z-30'>
            <a href={`${basicData.whatsapp.slug}`} target='_blank'>
              <div className='text-white shadow-lg  p-2  w-14 h-14  rounded-full flex justify-center items-center text-3xl bg-green-800'>
                <WhatsAppOutlined />
              </div>
            </a>
          </div>
          
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
