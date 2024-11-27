"use client";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";

export default function JoinCommunity() {
  return (
    <section className="relative h-[756px] pt-32 bg-purple-600 overflow-hidden">
      <div className="flex padding-container max-container">
        <div className="flex flex-col w-1/2 gap-5">
          <p className="semibold-40 text-purple-50 pt-10">
            Ready to Vent and Find your People?
          </p>
          <p className="regular-14 text-purple-50">
            Join Mindora Community, where real talk meets real support. Dealing
            with school stress, friendship drama, or life&apos;s ups and downs?
            We get it—and we&apos;ve got you!
          </p>

          <Link href="/community">
            <div className="flex flexStart mt-32 relative z-20">
              <Button
                type="button"
                title="Join Our Community"
                variant="btn_purple w-[373px]"
                size="big"
              />
            </div>
          </Link>

          <Image
            src="/vector5.png"
            alt="vector"
            width={700}
            height={379}
            className="absolute bottom-[-380px] left-[-100px] opacity-5 rotate-[90deg]"
          />
        </div>

        <div className="flex flex-1 relative">
          <Image
            src="/girl-img.png"
            alt="girl bg"
            width={689}
            height={768}
            className="absolute bottom-[-380px] left-[60px] z-10"
          />

          <Image
            src="/pattern.png"
            alt="pattern"
            width={429}
            height={513}
            className="absolute bottom-[-50px] left-[120px]"
          />

          {/* <Image
            src="/vector5.png"
            alt="vector"
            width={349}
            height={379}
            className="absolute bottom-[-30px] left-[160px] opacity-20"
          /> */}
        </div>
      </div>
    </section>
  );
}
