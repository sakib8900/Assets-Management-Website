const SharedTitle = ({ heading, subHeading }) => {
    return (
        <div>
            <div>
                <h3 className="text-blue-500 text-3xl font-bold text-center uppercase">{heading}</h3>
                <div className="divider w-1/3 mx-auto"></div>
            </div>
            <p className="text-center text-gray-600 mb-8">{subHeading}</p>
        </div>
    );
};

export default SharedTitle;