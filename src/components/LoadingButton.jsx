import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';


function LoadingButton({setIpButton}) {
  const [isLoading, setLoading] = useState(false);

  

  const handleClick = () => {
    setLoading(!isLoading);
    setIpButton(isLoading);

  } 
 
  
  return (
    <Button
      variant="primary"
      size="lg"
      onClick={handleClick}
    >
      MY IP ADDRESS
    </Button>
  );
}

export default LoadingButton;