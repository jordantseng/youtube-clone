import Image from "next/image";;

const Avatar = ({ src, alt }) => {
  return (
    <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0">
      <Image
        className="w-full h-full object-cover rounded-full"
        src={src}
        alt={alt}
        width={12}
        height={12}
      />
    </div>
  );
};

export default Avatar;