import React from 'react'

const Checkbox = ({imageId ,isPrivate}) => {

    const handlePrivacyChange = async (imageId, isChecked) => {
        try {
          await axios.put(
            `http://localhost:8001/api/v1/img/updateimage/${imageId}`,
            { isPrivate: isChecked },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          setImages(prevImages => 
            prevImages.map(image => 
              image._id === imageId ? { ...image, isPrivate: isChecked } : image
            )
          );
        } catch (error) {
          console.error('Error updating image privacy:', error);
        }
      };

  return (
    <div className="absolute top-0 right-0  bg-opacity-75 px-2 py-1 rounded text-sm flex items-center">
    <input
        type="checkbox"
        checked={isPrivate}
        onChange={e => handlePrivacyChange(imageId, e.target.checked)}
        className="mr-1"
    />
    {isPrivate ? "Private" : "Public"}
</div>
  )
}

export default Checkbox
