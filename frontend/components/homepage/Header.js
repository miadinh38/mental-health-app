"use client";
import Image from "next/image";
import Button from "../Button";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <div className="relative">
      {/* Middle Layer (2/3 width with linear background) */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-r from-white to-purple-300">
        <Image
          src="/vector3.png"
          width={225}
          height={486}
          className="w-[225px] h-[486px] right-0 transform -translate-y-[90px] absolute overflow-hidden"
          alt="vector 3"
        />
      </div>

      <div className="relative z-10 padding-container max-container flex flexCenter">
        <div className="flex">
          <div className="flex flex-1 flex-col pt-32">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Image 1: vector1.png */}
              <motion.div
                className="w-[140px] h-[80px] rotate-[3deg] absolute left-[110px] top-[-40px]"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="/vector1.png"
                  width={140}
                  height={80}
                  alt="vector 1"
                />
              </motion.div>

              {/* Text 1 */}
              <motion.p
                className="text-purple-900 semibold-32 pb-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Be heard, <br /> be understood, <br /> and be supported.
              </motion.p>
            </motion.div>
            {/* Image 2: vector2.png */}
            <motion.div
              className="w-[438px] h-[11px]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Image
                src="/vector2.png"
                width={438}
                height={11}
                alt="vector 2"
              />
            </motion.div>
            {/* Text 2 */}
            <motion.p
              className="regular-14 text-gray-500 pt-5 pb-16 pr-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Ever feel like you're carrying the weight of the world on your
              shoulders? At Mindora, we're here to lighten the load with a
              supportive community and resources to help you face life's
              challenges with confidence.
            </motion.p>

            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Button 1 */}
              <Button
                type="button"
                title="Articles"
                variant="btn_white w-[169px]"
                size="big"
              />

              {/* Button 2 */}
              <Button
                type="button"
                title="Join Now"
                variant="btn_purple w-[169px]"
                size="big"
              />
            </motion.div>
          </div>

          <div className="relative flex flex-1 flexCenter text-purple-900 pt-60 pb-10">
            <Image
              src="/img-header.png"
              width={520}
              height={384}
              className="w-[480px] h-[340px]"
              alt="vector 2"
            />

            <motion.div
              className="absolute transform translate-x-[40px] translate-y-[30px]"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Button
                type="button"
                title="Peer Pressure"
                variant="absolute btn_white_text transform -translate-x-[190px] -translate-y-[218px]"
              />

              <Button
                type="button"
                title="Anxiety Disorders"
                variant="absolute btn_white_text transform -translate-x-[180px] -translate-y-[270px] z-10 rotate-[13deg]"
              />

              <Button
                type="button"
                title="Depression"
                variant="absolute btn_white_text transform -translate-x-[60px] -translate-y-[225px] z-20 rotate-[-5deg]"
              />

              <Button
                type="button"
                title="Bipolar Disorder"
                variant="absolute btn_white_text transform -translate-x-[-20px] -translate-y-[245px] z-30 rotate-[20.75deg]"
              />

              <Button
                type="button"
                title="Low Self-esteem"
                variant="absolute btn_white_text transform -translate-x-[80px] -translate-y-[310px] z-20 rotate-[-4deg]"
              />

              <Button
                type="button"
                title="Perfectionism"
                variant="absolute btn_white_text transform -translate-x-[130px] -translate-y-[350px] z-20 rotate-[-17.59deg]"
              />
            </motion.div>

            <Image
              src="/img-header2.png"
              width={385}
              height={283}
              className="w-[385px] h-[283px] transform -translate-y-[15px] absolute"
              alt="header image - girl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
