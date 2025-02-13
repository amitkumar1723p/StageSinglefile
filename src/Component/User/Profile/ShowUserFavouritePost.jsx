import React from "react";
import { useSelector } from "react-redux";
import PostCard from "../../Post/PostCard";
import { Helmet } from "react-helmet";
export default function ShowUserFavouritePost() {
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });

  return (
    <>

<Helmet>
                
                <title>Favorite Properties - PropertyDekho247.com</title>
                <meta name="description" content="Save and revisit your favorite property listings on PropertyDekho247.com. Easily access the properties you’re interested in and keep track of your potential choices all in one place!
"></meta>
                <link rel="canonical" href="https://www.propertydekho247.com/user/favourite-post/" />
            </Helmet>
      <h3 className="Shortlisted-prop">Shortlisted Property</h3>
     
   

      <div className="showpost">
        {medata && medata.user&&medata.user.FavouritePost &&
          medata.user.FavouritePost.map((post, i) => {
            return <PostCard key={i} PostData={post.PostData.PostId} />;
          })}
      </div>
    </>
  );
}
