import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton"; // MUI Skeleton for loading state
import "../Style/Loader.css";
import ImageCarousel from "./ImageCarousel";
import axios from "axios";

const Cards = ({ card }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/property/${card._id}`, { state: { card } });
  };

  const truncateDescription = (htmlString, maxLength) => {
    const plainText = htmlString.replace(/<[^>]+>/g, "");
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  return (
    <div className="px-3 mb-4 col-lg-3 col-md-4 col-sm-6 pt-4">
      <div className="card h-100">
        <a
          href={card.property_images[0]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="card-img-top img-fluid h-60"
            loading="lazy"
            decoding="async"
            src={card.property_images[0]}
            alt={card.name}
          />
        </a>
        <div className="card-body">
          <h5 className="card-title">
            <strong>{card.name}</strong>
          </h5>
          <p className="card-text flex gap-2 py-1">
            <svg
              width="20px"
              height="20px"
              viewBox="-30 0 162 162"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.5958 120.849C20.9996 122.189 12.5714 124.547 5.89444 130.952C2.54712 134.168 0.878113 138.021 1.20169 141.806C1.51148 145.436 3.66617 148.776 7.26881 151.209C11.1302 153.83 15.3871 155.815 19.8772 157.089C29.6068 159.807 39.6601 161.191 49.7622 161.207C57.3009 161.203 64.8192 160.424 72.1982 158.881C79.3523 157.39 87.632 155.139 94.7599 149.757C98.2037 147.158 100.23 143.963 100.621 140.516C101.015 137.037 99.7388 133.431 96.9271 130.08C93.0042 125.403 87.8171 122.195 81.0693 120.272C78.5444 119.55 75.921 119.068 73.3842 118.6C72.5507 118.446 71.7178 118.293 70.8849 118.13C71.9055 116.539 72.9307 114.954 73.9605 113.376C76.5622 109.372 79.2532 105.231 81.7302 101.058C89.1364 88.5795 97.8591 71.7897 99.5826 52.5642C101.399 32.303 95.0145 17.7991 80.0638 8.22578C69.6937 1.58496 58.122 -0.648498 45.6752 1.59158C26.8567 4.97632 14.5588 15.9805 9.12306 34.2989C5.88275 45.2216 7.06875 56.2665 8.46672 64.6696C10.756 78.4575 15.9286 92.2543 25.2401 109.405C26.6919 112.08 28.2257 114.63 29.8501 117.329C30.4159 118.268 30.983 119.214 31.5514 120.168L30.8295 120.285C29.7019 120.466 28.6426 120.637 27.5958 120.849ZM51.7895 127.563C51.3568 128.123 50.9212 128.686 50.4828 129.255C41.7279 121.787 36.1235 112.24 31.3723 103.015C25.2578 91.1438 18.7232 76.8586 16.6217 60.9068C14.8246 47.255 16.1694 37.1774 20.983 28.221C26.9629 17.0955 38.8498 10.0695 52.7806 9.42563C53.4627 9.39413 54.1411 9.37824 54.8153 9.37824C67.6341 9.37824 78.9684 15.0413 85.4208 24.7656C89.5275 30.9582 91.341 38.1747 91.131 47.475C90.8947 57.8307 88.0317 68.5074 82.1214 81.0723C75.4517 95.2564 66.7415 108.917 55.4939 122.834C54.239 124.385 53.0491 125.928 51.7895 127.563ZM34.7451 125.964C35.4474 125.995 36.1163 126.272 36.6354 126.747C40.5985 131.286 45.5055 134.904 51.0132 137.349C53.4239 138.412 55.5707 137.76 57.3888 135.412L58.6273 133.808C60.3049 131.63 62.0403 129.378 63.8472 127.264C64.3824 126.598 65.1522 126.161 65.9987 126.045C72.1936 126.548 78.7071 127.494 84.3654 130.981C86.7506 132.502 88.8876 134.381 90.7011 136.553C91.0949 136.944 91.404 137.412 91.6107 137.928C91.8175 138.443 91.9173 138.995 91.9035 139.55C91.8083 140.115 91.5989 140.655 91.2885 141.136C90.978 141.618 90.5731 142.032 90.0979 142.353C87.9549 144.058 85.6053 145.486 83.1033 146.602C73.7131 150.772 62.8882 152.85 49.0395 153.14C38.9923 152.77 29.2043 152.177 19.9158 149.047C16.8881 148.059 14.0059 146.671 11.3454 144.921C9.48011 143.663 8.44762 142.193 8.36033 140.668C8.27763 139.231 9.05342 137.771 10.603 136.446C13.9412 133.59 17.6803 131.24 21.7011 129.47C24.9119 128.071 28.4949 127.296 31.9603 126.547C32.809 126.364 33.6577 126.18 34.5004 125.987C34.5809 125.971 34.6629 125.963 34.7451 125.964Z"
                fill="#000000"
              />
              <path
                d="M71.6559 44.1069C71.6559 43.927 71.6631 43.7473 71.6677 43.5681C71.6999 42.7805 71.6894 41.9917 71.6349 41.2053C71.4085 38.1778 70.4226 35.2566 68.7674 32.7113C67.1127 30.1662 64.8425 28.0794 62.1672 26.6444C59.5673 25.2742 56.6602 24.5922 53.7222 24.6635C50.7844 24.7349 47.9135 25.5573 45.3833 27.0521C39.4106 30.4401 35.6617 36.1457 34.5433 43.5518C33.0908 53.1685 39.9252 62.579 49.7769 64.529C51.1036 64.7941 52.453 64.9289 53.8061 64.9318C62.0976 64.9318 68.8665 59.6438 70.9274 51.0923C71.2463 49.6527 71.4885 48.197 71.6526 46.7316C71.7393 46.072 71.8246 45.4125 71.925 44.7562C71.9388 44.6664 71.9342 44.5746 71.9112 44.4866C71.8889 44.3987 71.8489 44.3162 71.7937 44.244C71.7543 44.1921 71.7077 44.1459 71.6559 44.1069ZM64.2051 44.9052L64.1913 45.1802C64.1775 45.4768 64.1585 45.8771 64.1257 46.2775C63.7812 50.4453 62.2557 53.6883 59.7144 55.6547C57.4546 57.4038 54.4993 58.0227 51.1625 57.4477C49.4206 57.0842 47.7699 56.3732 46.3093 55.357C44.8486 54.3408 43.6079 53.0401 42.6614 51.5333C41.7984 50.1604 41.244 48.6166 41.0368 47.0082C40.8296 45.3998 40.9747 43.7654 41.4617 42.2187C42.7186 37.9282 44.5755 33.7833 49.6102 32.5139C50.8258 32.2002 52.0755 32.0378 53.3309 32.0303C55.7094 31.9733 58.0361 32.7298 59.9263 34.1746C62.7512 36.4088 64.2707 40.22 64.2051 44.9023V44.9052Z"
                fill="#000000"
              />
            </svg>
            <strong> {card.location} </strong>
          </p>
          <p
            className="card-text"
            dangerouslySetInnerHTML={{
              __html: truncateDescription(card.description, 50),
            }}
          ></p>
          <p className="card-text">
            <strong>Type:</strong> {card.type}
          </p>
          <p className="card-text">
            <strong>Price:</strong> ₹{card.price}
          </p>
          <div className="d-flex justify-content-between">
            <p className="card-text">
              <strong>Area:</strong> {card.area}
            </p>
          </div>
          <button
            className="mt-2 btn w-100 btn-outline-secondary"
            onClick={handleReadMore}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

// CardsGrid component
const CardsGrid = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 20;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_ROUTE}/property/fetch`
        );
        if (response.status === 200) {
          const data = await response.data;
          setCards(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = filteredCards.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          {[...Array(cardsPerPage)].map((_, index) => (
            <div key={index} className="px-3 mb-4 col-lg-3 col-md-4 col-sm-6">
              <Skeleton variant="rectangular" height={200} />
              <Skeleton width="60%" />
              <Skeleton width="80%" />
              <Skeleton width="40%" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      {/* Hero Slider Section */}
      {/* <HeroSection />  */}

      {/* Search Input */}
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ImageCarousel />

      {/* Cards Display */}
      <div className="row">
        {currentCards.length > 0 ? (
          currentCards.map((card) => <Cards key={card._id} card={card} />)
        ) : (
          <div className="col text-center">
            <p>No properties found matching your search.</p>
          </div>
        )}
      </div>

      {/* MUI Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default CardsGrid;
