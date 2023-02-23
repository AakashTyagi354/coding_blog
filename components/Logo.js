import FlareIcon from '@mui/icons-material/Flare';
    import Link from "next/link";

    const Logo = () => {
        return (
            <Link href="/" className="my-2 flex items-center space-x-1 text-indigo-500">
           
              <FlareIcon  className="h-8 w-8 flex-shrink-0 mr-3"/>
             
          
            </Link>
        )
    }

    export default Logo;