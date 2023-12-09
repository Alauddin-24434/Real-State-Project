/* eslint-disable react/prop-types */




const Header = ({ header }) => {
    return (

        <div className=" w-full">
          
            


                    <img className="w-full object-cover" src={header?.image} alt="" />
                    <p className="text-3xl font-medium py-4 text-zinc-500">{header?.title}</p>
              
           
        </div>

    );
};

export default Header;