import ImageCarousel from '@/components/ImageCarousel';
import Products from '@/components/Products';
import FeaturedCategories from '@/components/FeaturedCategories';
import Stitching from '@/components/stitching';


export default function Home() {
  const images = [
    '/1 (1).jpeg',
    '/1 (2).jpeg',
    '/1 (3).jpeg'
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full">
        <ImageCarousel images={images} />
        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          <Products />
          <Stitching />
          
          <FeaturedCategories />
         
        </div>
      </div>
    </main>
  );
}
