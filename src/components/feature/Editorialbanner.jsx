import Section from "../base/Section";
import Box from "../base/Box";
import Typography from "../base/Typography";
import Button from "../base/Button";
export default function EditorialBanner({ onCtaClick }) {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 bg-[#2c2c2c] flex items-center">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=500&fit=crop"
          alt="editorial"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        {/* Content */}
        <div className="relative z-10 px-10 md:px-16">
          <p className="text-xs tracking-widest uppercase text-[#c8a96e] mb-3">
            Limited Offer
          </p>
          <h2 className="heading text-3xl md:text-4xl text-white leading-tight mb-5">
            10% off your
            <br />
            first order.
          </h2>
          <p className="text-sm text-white/60 mb-6">
            Use code <span className="text-[#c8a96e] font-medium">SAVE10</span>{" "}
            at checkout.
          </p>
          <button
            onClick={onCtaClick}
            className="bg-white text-[#2c2c2c] px-7 py-3 rounded-full text-xs tracking-widest uppercase hover:bg-[#c8a96e] transition-all"
          >
            Shop & Save
              <Section className="max-w-6xl mx-auto px-6 pb-16">
                <Box className="relative rounded-3xl overflow-hidden h-64 md:h-80 bg-[#2c2c2c] flex items-center">
                  {/* Background image */}
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=500&fit=crop"
                    alt="editorial"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                  />
                  {/* Content */}
                  <Box className="relative z-10 px-10 md:px-16">
                    <Typography as="p" className="text-xs tracking-widest uppercase text-[#c8a96e] mb-3">
                      Limited Offer
                    </Typography>
                    <Typography as="h2" className="heading text-3xl md:text-4xl text-white leading-tight mb-5">
                      10% off your<br />first order.
                    </Typography>
                    <Typography as="p" className="text-sm text-white/60 mb-6">
                      Use code <span className="text-[#c8a96e] font-medium">SAVE10</span> at checkout.
                    </Typography>
                    <Button
                      onClick={onCtaClick}
                      className="bg-white text-[#2c2c2c] px-7 py-3 rounded-full text-xs tracking-widest uppercase hover:bg-[#c8a96e] transition-all"
                    >
                      Shop & Save
                    </Button>
                  </Box>
                </Box>
              </Section>
