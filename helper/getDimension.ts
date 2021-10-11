import { useState,useEffect } from "react";

interface IDim {
    width:number;
    height:number
}

const useDimension = () => {
    const [dim, setDim] = useState<IDim>({width:1920,height:1080});

    useEffect(() => {
        if (typeof (window) != undefined) {
            setDim({width:window.innerWidth,height:window.innerHeight});
        }
    }, [])

  return [dim.width,dim.height]
}

export default useDimension;