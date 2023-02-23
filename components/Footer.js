import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Footer = () => {
  return (
    <div className="bg-white dark:bg-black h-[100px] flex justify-evenly items-center border-t-2">
      <div>
        <p>© 2010–2023 All Rights Reserved</p>
      </div>
      <div className="space-x-6">
        <YouTubeIcon className="cursor-pointer" />
        <TwitterIcon className="cursor-pointer"/>
        <LinkedInIcon className="cursor-pointer"/>

        

      </div>
    </div>
  );
};

export default Footer;
