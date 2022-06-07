import logo from '../assets/images/mediakeys.png'

// Displays the loader used while loading data
 export const Loader = () : JSX.Element => {
    return (
      <div className='loader'>
          <img src={logo} alt='loader' className='loader__logo'/>
      </div>
    );
  }
  