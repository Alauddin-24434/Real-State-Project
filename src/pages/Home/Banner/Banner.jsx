
import Container from '../../../Components/Shared/Container';
import bannerImage from '../../../assets/images/home/01.jpg';

const Banner = () => {
  return (
    <Container>
      <div className="">
        <img className="w-full h-auto" src={bannerImage} alt="Banner" />
      </div>
    </Container>
  );
};

export default Banner;
