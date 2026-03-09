import { Link } from "react-router-dom";

const VALUES = [
  {
    icon: "✦",
    title: "Quiet Luxury",
    desc: "We believe true elegance needs no announcement. Our pieces whisper rather than shout — refined, timeless, and effortlessly worn.",
  },
  {
    icon: "◈",
    title: "Ethical Craft",
    desc: "Every garment is made in small batches by skilled artisans who are paid fairly. We choose people over speed, always.",
  },
  {
    icon: "❋",
    title: "Natural Materials",
    desc: "From Mongolian cashmere to Portuguese linen, we source only natural fibres that age beautifully and return gracefully to the earth.",
  },
  {
    icon: "◎",
    title: "Carbon Conscious",
    desc: "We offset 100% of our shipping emissions, use recycled packaging, and publish a yearly sustainability report with full transparency.",
  },
];

const MILESTONES = [
  {
    year: "2018",
    text: "Maison is founded in Paris by two friends with a shared belief that luxury should be quiet, considered, and kind.",
  },
  {
    year: "2019",
    text: "Our first capsule collection — 12 pieces in natural fibres — sells out in 48 hours. We realise we've touched something real.",
  },
  {
    year: "2021",
    text: "We become carbon-neutral across all operations and partner with three family-run ateliers in Portugal and Japan.",
  },
  {
    year: "2023",
    text: "Maison opens its first physical space in Hanoi, a calm room where you can touch, try, and take your time.",
  },
  {
    year: "2025",
    text: "10,000 customers across 40 countries. Still small. Still intentional. Still here for the long run.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        .fu  { animation: fadeUp 0.6s ease both; }
        .fu1 { animation: fadeUp 0.6s ease 0.1s both; }
        .fu2 { animation: fadeUp 0.6s ease 0.2s both; }
        .fu3 { animation: fadeUp 0.6s ease 0.3s both; }
      `}</style>

      <div style={{ background: "#f9f6f2", minHeight: "100vh" }}>
        {/* ── Hero ── */}
        <div
          style={{
            position: "relative",
            height: "520px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80"
            alt="Our Story"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(44,44,44,0.55) 0%, rgba(44,44,44,0.3) 100%)",
            }}
          />
          <div
            className="fu"
            style={{
              position: "relative",
              textAlign: "center",
              color: "white",
              padding: "0 24px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#c8a96e",
                marginBottom: "12px",
              }}
            >
              Est. 2018 · Paris
            </p>
            <h1
              className="heading"
              style={{
                fontSize: "clamp(36px, 6vw, 64px)",
                marginBottom: "16px",
                lineHeight: 1.1,
              }}
            >
              Our Story
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.8)",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              A brand born from the belief that what you wear should feel as
              good as it looks — and leave the world a little better than you
              found it.
            </p>
          </div>
        </div>

        {/* ── Opening statement ── */}
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "80px 24px 60px",
            textAlign: "center",
          }}
        >
          <p
            className="fu heading"
            style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              color: "#2c2c2c",
              lineHeight: 1.5,
              marginBottom: "20px",
            }}
          >
            "We didn't set out to build a fashion brand. We set out to make the
            things we couldn't find — beautiful, honest, and built to last."
          </p>
          <p
            className="fu1"
            style={{
              fontSize: "13px",
              color: "#9a8c7e",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
          </p>
        </div>

        {/* ── Values ── */}
        <div style={{ background: "#2c2c2c", padding: "80px 24px" }}>
          <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
            <div
              className="fu"
              style={{ textAlign: "center", marginBottom: "52px" }}
            >
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#c8a96e",
                  marginBottom: "8px",
                }}
              >
                What we stand for
              </p>
              <h2
                className="heading"
                style={{ fontSize: "32px", color: "white" }}
              >
                Our Values
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "32px",
              }}
            >
              {VALUES.map((v, i) => (
                <div
                  key={v.title}
                  className={`fu${i}`}
                  style={{ textAlign: "center" }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      border: "1px solid #c8a96e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                      fontSize: "20px",
                      color: "#c8a96e",
                    }}
                  >
                    {v.icon}
                  </div>
                  <h3
                    className="heading"
                    style={{
                      fontSize: "18px",
                      color: "white",
                      marginBottom: "10px",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.7,
                    }}
                  >
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Story + image split ── */}
        <div
          style={{
            maxWidth: "1040px",
            margin: "0 auto",
            padding: "80px 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <div className="fu">
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#c8a96e",
                marginBottom: "8px",
              }}
            >
              How it started
            </p>
            <h2
              className="heading"
              style={{
                fontSize: "30px",
                color: "#2c2c2c",
                marginBottom: "20px",
                lineHeight: 1.3,
              }}
            >
              A slow conversation
              <br />
              about fast fashion
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#6b5f5a",
                lineHeight: 1.8,
                marginBottom: "16px",
              }}
            >
              Léa and Anh met at a flea market in the 11th arrondissement, both
              hunting for the same coat. Over coffee they discovered a shared
              frustration: the clothes they loved were either unaffordable or
              unethical. Usually both.
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#6b5f5a",
                lineHeight: 1.8,
                marginBottom: "16px",
              }}
            >
              So they started small. A shared spreadsheet. A single linen shirt
              pattern. A seamstress in Lisbon who agreed to make 50 pieces "just
              to see." They sold out of those 50 in a weekend.
            </p>
            <p style={{ fontSize: "14px", color: "#6b5f5a", lineHeight: 1.8 }}>
              Today Maison has grown — but the original promise hasn't. Every
              piece we make is still something we'd buy ourselves.
            </p>
          </div>
          <div
            className="fu1"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "4/5",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80"
              alt="Atelier"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* ── Timeline ── */}
        <div style={{ background: "white", padding: "80px 24px" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div
              className="fu"
              style={{ textAlign: "center", marginBottom: "52px" }}
            >
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#c8a96e",
                  marginBottom: "8px",
                }}
              >
                The journey
              </p>
              <h2
                className="heading"
                style={{ fontSize: "32px", color: "#2c2c2c" }}
              >
                Milestones
              </h2>
            </div>
            <div style={{ position: "relative", paddingLeft: "40px" }}>
              {/* Vertical line */}
              <div
                style={{
                  position: "absolute",
                  left: "9px",
                  top: "8px",
                  bottom: "8px",
                  width: "1px",
                  background: "#e8e2db",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "36px",
                }}
              >
                {MILESTONES.map((m) => (
                  <div
                    key={m.year}
                    className="fu"
                    style={{ position: "relative" }}
                  >
                    {/* Dot */}
                    <div
                      style={{
                        position: "absolute",
                        left: "-35px",
                        top: "4px",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "#c8a96e",
                        border: "2px solid white",
                        boxShadow: "0 0 0 2px #c8a96e",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "11px",
                        letterSpacing: "2px",
                        color: "#c8a96e",
                        marginBottom: "4px",
                        fontWeight: 600,
                      }}
                    >
                      {m.year}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#5a4f4a",
                        lineHeight: 1.7,
                      }}
                    >
                      {m.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA banner ── */}
        <div
          style={{
            background: "#2c2c2c",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <p
            className="fu"
            style={{
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#c8a96e",
              marginBottom: "12px",
            }}
          >
            Wear the story
          </p>
          <h2
            className="fu1 heading"
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              color: "white",
              marginBottom: "20px",
            }}
          >
            Ready to find your piece?
          </h2>
          <p
            className="fu2"
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.55)",
              marginBottom: "36px",
              maxWidth: "440px",
              margin: "0 auto 36px",
              lineHeight: 1.7,
            }}
          >
            Every item in our collection is made with the same intention that
            started all of this.
          </p>
          <div
            className="fu3"
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/"
              style={{
                padding: "14px 32px",
                background: "#c8a96e",
                color: "white",
                borderRadius: "10px",
                fontSize: "11px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Shop New Arrivals
            </Link>
            <Link
              to="/women"
              style={{
                padding: "14px 32px",
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "10px",
                fontSize: "11px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Women's Collection
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
