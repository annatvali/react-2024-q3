import Image from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const MockImage: React.FC<ImageProps> = ({ src, alt, width, height }) => (
  <Image src={src} alt={alt} width={width} height={height} />
);

export default MockImage;
