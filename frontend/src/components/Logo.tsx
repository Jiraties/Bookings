import "./Logo.css";

type LogoProps = {
  isAbsolute: boolean;
};

const Logo = ({ isAbsolute = false }: LogoProps) => {
  return (
    <div className={isAbsolute ? "logo__div absolute" : "logo__div"}>
      <h2 className="logo__blueText">Baan Mai Kradan</h2>
      <h2>
        Bookings <i className="bx bx-hotel"></i>
      </h2>
    </div>
  );
};

export default Logo;
