import Alert from "react-bootstrap/Alert";

function Banner({ message }) {
  return (
    <>
      {["warning"].map((variant) => (
        <Alert
          key={variant}
          variant={variant}
          style={{
            width: "51%",
            marginBottom: "0px",
          }}
        >
          {message}
        </Alert>
      ))}
    </>
  );
}

export default Banner;
