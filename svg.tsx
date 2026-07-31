export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ background: '#F4F0FC', fontFamily: 'system-ui, sans-serif' }}
    >
      {/* Header */}
      <div style={{ background: '#2F0C23', padding: '32px 48px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span
            style={{
              fontSize: 52,
              fontWeight: 900,
              letterSpacing: '-2px',
              color: '#F4F0FC',
            }}
          >
            AJ
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '4px',
              color: '#9183CC',
              textTransform: 'uppercase',
            }}
          >
            NextChapter
          </span>
        </div>
        <p style={{ color: '#C4B8E0', fontSize: 13, marginTop: 4 }}>
          Character Design · SVG Sheet
        </p>
      </div>

      <div
        style={{ padding: '48px 48px 64px', maxWidth: 960, margin: '0 auto' }}
      >
        {/* Hero — back view */}
        <div
          style={{
            display: 'flex',
            gap: 48,
            alignItems: 'flex-end',
            marginBottom: 56,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '3px',
                color: '#9183CC',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Main · Back View
            </p>
            <div
              style={{
                background: '#fff',
                borderRadius: 24,
                padding: '32px 40px',
                boxShadow: '0 4px 24px rgba(47,12,35,0.08)',
                display: 'inline-block',
              }}
            >
              <AJBack />
            </div>
          </div>

          {/* Color palette */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '3px',
                color: '#9183CC',
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              Color Palette
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PALETTE.map(({ name, hex }) => (
                <div
                  key={name}
                  style={{ display: 'flex', alignItems: 'center', gap: 14 }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: hex,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#2F0C23',
                      }}
                    >
                      {name}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: '#9183CC',
                        fontFamily: 'monospace',
                      }}
                    >
                      {hex}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Moods */}
        <div style={{ marginBottom: 56 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '3px',
              color: '#9183CC',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            Moods &amp; Poses
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 12,
            }}
          >
            {MOODS.map(({ label, Component }) => (
              <div
                key={label}
                style={{
                  background: '#fff',
                  borderRadius: 18,
                  padding: '20px 12px 14px',
                  boxShadow: '0 2px 16px rgba(47,12,35,0.06)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}
                >
                  <Component />
                </div>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#5A4E82',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Walking scene strip */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '3px',
              color: '#9183CC',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            AJ in Motion
          </p>
          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              padding: '32px 48px',
              boxShadow: '0 4px 24px rgba(47,12,35,0.08)',
              display: 'flex',
              alignItems: 'flex-end',
              gap: 48,
              justifyContent: 'center',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <AJWalkA />
              <p
                style={{
                  fontSize: 10,
                  color: '#C4B8E0',
                  marginTop: 8,
                  letterSpacing: '1px',
                }}
              >
                Day 1
              </p>
            </div>
            <div style={{ width: 40, borderTop: '2px dashed #E0D8F0' }} />
            <div style={{ textAlign: 'center' }}>
              <AJNeutral size={80} />
              <p
                style={{
                  fontSize: 10,
                  color: '#C4B8E0',
                  marginTop: 8,
                  letterSpacing: '1px',
                }}
              >
                Day 14
              </p>
            </div>
            <div style={{ width: 40, borderTop: '2px dashed #E0D8F0' }} />
            <div style={{ textAlign: 'center' }}>
              <AJWalkB />
              <p
                style={{
                  fontSize: 10,
                  color: '#C4B8E0',
                  marginTop: 8,
                  letterSpacing: '1px',
                }}
              >
                Day 90
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Color tokens ─── */
const S = '#F5C898'; // skin
const H = '#1C1208'; // hair
const HO = '#7B69B8'; // hoodie
const HS = '#5A4E82'; // hoodie shadow
const HL = '#9183CC'; // hoodie light
const J = '#3A3268'; // jeans
const JS = '#2A235A'; // jeans shadow
const SH = '#1E162E'; // shoes
const OL = '#2F0C23'; // outline

const PALETTE = [
  { name: 'Skin', hex: '#F5C898' },
  { name: 'Hair', hex: '#1C1208' },
  { name: 'Hoodie', hex: '#7B69B8' },
  { name: 'Hoodie Shadow', hex: '#5A4E82' },
  { name: 'Jeans', hex: '#3A3268' },
  { name: 'Shoes', hex: '#1E162E' },
  { name: 'Outline / Stroke', hex: '#2F0C23' },
];

/* ─── Hero back view ─── */
function AJBack() {
  return (
    <svg
      viewBox="0 0 120 220"
      width={140}
      height={256}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hair mass */}
      <ellipse cx="60" cy="26" rx="24" ry="26" fill={H} />
      {/* Hair curl texture */}
      <path
        d="M44,12 Q50,6 58,10"
        stroke="#362410"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M62,8 Q70,5 76,12"
        stroke="#362410"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Neck */}
      <rect x="53" y="47" width="14" height="12" rx="4" fill={S} />
      {/* Hood down on back */}
      <path d="M30,60 Q60,49 90,60 Q84,75 60,72 Q36,75 30,60Z" fill={HS} />
      {/* Hood inner shadow */}
      <path d="M38,63 Q60,55 82,63 Q76,72 60,70 Q44,72 38,63Z" fill="#4A3E72" />
      {/* Hoodie back body */}
      <path
        d="M24,68 L18,128 L102,128 L96,68 Q80,80 60,80 Q40,80 24,68Z"
        fill={HO}
      />
      {/* Hoodie highlight - subtle shoulder shine */}
      <path
        d="M24,68 Q32,74 42,77"
        stroke={HL}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M96,68 Q88,74 78,77"
        stroke={HL}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Left sleeve */}
      <path d="M24,68 L12,122 L23,126 L34,74" fill={HO} />
      <path
        d="M24,68 L16,100 L12,122 L23,126 L28,110"
        fill={HS}
        opacity="0.4"
      />
      {/* Right sleeve */}
      <path d="M96,68 L108,122 L97,126 L86,74" fill={HO} />
      <path
        d="M96,68 L104,100 L108,122 L97,126 L92,110"
        fill={HS}
        opacity="0.4"
      />
      {/* Cuffs */}
      <rect x="9" y="122" width="16" height="6" rx="3" fill={HS} />
      <rect x="95" y="122" width="16" height="6" rx="3" fill={HS} />
      {/* Hands */}
      <ellipse cx="17" cy="133" rx="7" ry="8" fill={S} />
      <ellipse cx="103" cy="133" rx="7" ry="8" fill={S} />
      {/* Knuckles */}
      <path
        d="M12,130 Q17,128 22,130"
        stroke="#D4A87A"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M98,130 Q103,128 108,130"
        stroke="#D4A87A"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      {/* Waistband */}
      <path d="M26,124 Q60,132 94,124 L94,131 Q60,139 26,131Z" fill={HS} />
      {/* Left jeans */}
      <path d="M36,128 L31,200 L56,200 L60,128Z" fill={J} />
      {/* Left jeans highlight */}
      <path
        d="M38,130 L35,185"
        stroke={HL}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.2"
      />
      {/* Right jeans */}
      <path d="M60,128 L64,200 L89,200 L84,128Z" fill={J} />
      {/* Center seam */}
      <path
        d="M58,128 Q60,155 59,175"
        stroke={JS}
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      {/* Left shoe */}
      <ellipse cx="43" cy="203" rx="17" ry="7" fill={SH} />
      <ellipse cx="36" cy="202" rx="7" ry="5" fill="#2A2040" />
      {/* Right shoe */}
      <ellipse cx="77" cy="203" rx="17" ry="7" fill={SH} />
      <ellipse cx="84" cy="202" rx="7" ry="5" fill="#2A2040" />
    </svg>
  );
}

/* ─── Shared mini character (front-facing) ─── */
function MiniFigure({
  moodY = 0, // mouth curve: positive=smile, negative=frown
  headTilt = 0, // px the head shifts (positive=up, negative=down)
  lookDir = 0, // eye Y offset
  armL = [0, 0], // left hand extra offset [x,y]
  armR = [0, 0], // right hand extra offset
  legsOpen = false, // spread legs for walking
  legFwd = 'none' as 'left' | 'right' | 'none',
  armsUp = false,
  armsCross = false,
  hunch = 0,
  size = 64,
}: {
  moodY?: number;
  headTilt?: number;
  lookDir?: number;
  armL?: [number, number];
  armR?: [number, number];
  legsOpen?: boolean;
  legFwd?: 'left' | 'right' | 'none';
  armsUp?: boolean;
  armsCross?: boolean;
  hunch?: number;
  size?: number;
}) {
  const vw = 70,
    vh = 140;
  // head center
  const hx = 35,
    hy = 20 - headTilt;
  // body top
  const bTop = hy + 17 + hunch;
  const bBot = bTop + 52;
  // leg split
  const ll = legsOpen ? -8 : 0,
    rl = legsOpen ? 8 : 0;
  const lFwdY = legFwd === 'left' ? -10 : legFwd === 'right' ? 10 : 0;
  const rFwdY = legFwd === 'right' ? -10 : legFwd === 'left' ? 10 : 0;

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      width={size}
      height={size * (vh / vw)}
      fill="none"
    >
      {/* Hair */}
      <ellipse cx={hx} cy={hy} rx={13} ry={14} fill={H} />
      {/* Hair curls */}
      <path
        d={`M${hx - 9},${hy - 8} Q${hx - 5},${hy - 14} ${hx},${hy - 12}`}
        stroke="#362410"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />
      {/* Face */}
      <ellipse cx={hx} cy={hy + 2} rx={10} ry={11} fill={S} />
      {/* Eyes */}
      <ellipse cx={hx - 4} cy={hy + lookDir} rx={1.6} ry={2} fill={H} />
      <ellipse cx={hx + 4} cy={hy + lookDir} rx={1.6} ry={2} fill={H} />
      {/* Mouth */}
      <path
        d={`M${hx - 4},${hy + 7} Q${hx},${hy + 7 + moodY} ${hx + 4},${hy + 7}`}
        stroke={OL}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Neck */}
      <rect x={hx - 5} y={hy + 11} width={10} height={7} rx={3} fill={S} />

      {armsCross ? (
        /* Crossed arms over chest */
        <>
          <path
            d={`M${hx - 16},${bTop + 14} L${hx + 10},${bTop + 22} L${hx + 8},${
              bTop + 26
            } L${hx - 18},${bTop + 18}Z`}
            fill={HO}
          />
          <path
            d={`M${hx + 16},${bTop + 14} L${hx - 10},${bTop + 24} L${hx - 8},${
              bTop + 28
            } L${hx + 18},${bTop + 18}Z`}
            fill={HS}
          />
        </>
      ) : (
        <>
          {/* Left arm */}
          <path
            d={`M${hx - 13},${bTop + 4} L${hx - 16 + armL[0]},${
              bTop + 36 + armL[1]
            } L${hx - 11 + armL[0]},${bTop + 38 + armL[1]} L${hx - 8},${
              bTop + 8
            }`}
            fill={armsUp ? HS : HO}
          />
          {/* Left hand */}
          <ellipse
            cx={hx - 13 + armL[0]}
            cy={bTop + 41 + armL[1]}
            rx={4.5}
            ry={5}
            fill={S}
          />
          {/* Right arm */}
          <path
            d={`M${hx + 13},${bTop + 4} L${hx + 16 + armR[0]},${
              bTop + 36 + armR[1]
            } L${hx + 11 + armR[0]},${bTop + 38 + armR[1]} L${hx + 8},${
              bTop + 8
            }`}
            fill={armsUp ? HS : HO}
          />
          {/* Right hand */}
          <ellipse
            cx={hx + 13 + armR[0]}
            cy={bTop + 41 + armR[1]}
            rx={4.5}
            ry={5}
            fill={S}
          />
        </>
      )}

      {/* Hoodie body */}
      <path
        d={`M${hx - 18},${bTop} L${hx - 15},${bBot} L${hx + 15},${bBot} L${
          hx + 18
        },${bTop} Q${hx + 10},${bTop + 10} ${hx},${bTop + 10} Q${hx - 10},${
          bTop + 10
        } ${hx - 18},${bTop}Z`}
        fill={HO}
      />
      {/* Hoodie pocket */}
      <rect x={hx - 9} y={bBot - 16} width={18} height={11} rx={4} fill={HS} />
      {/* Hood strings */}
      <path
        d={`M${hx - 4},${bTop + 5} L${hx - 5},${bTop + 22}`}
        stroke={HS}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d={`M${hx + 4},${bTop + 5} L${hx + 5},${bTop + 22}`}
        stroke={HS}
        strokeWidth="1.2"
        fill="none"
      />

      {/* Left leg */}
      <path
        d={`M${hx - 11 + ll},${bBot} L${hx - 13 + ll},${bBot + 42 + lFwdY} L${
          hx - 2 + ll
        },${bBot + 42 + lFwdY} L${hx},${bBot}Z`}
        fill={J}
      />
      {/* Right leg */}
      <path
        d={`M${hx},${bBot} L${hx + 2 + rl},${bBot + 42 + rFwdY} L${
          hx + 13 + rl
        },${bBot + 42 + rFwdY} L${hx + 11 + rl},${bBot}Z`}
        fill={J}
      />

      {/* Left shoe */}
      <ellipse
        cx={hx - 9 + ll}
        cy={bBot + 45 + lFwdY}
        rx={9}
        ry={4.5}
        fill={SH}
      />
      {/* Right shoe */}
      <ellipse
        cx={hx + 9 + rl}
        cy={bBot + 45 + rFwdY}
        rx={9}
        ry={4.5}
        fill={SH}
      />
    </svg>
  );
}

function AJHopeful({ size = 64 }) {
  return (
    <MiniFigure
      moodY={4}
      headTilt={3}
      lookDir={-2}
      armL={[0, -6]}
      armR={[0, -6]}
      size={size}
    />
  );
}

function AJNeutral({ size = 64 }) {
  return <MiniFigure moodY={0} headTilt={0} lookDir={0} size={size} />;
}

function AJSad({ size = 64 }) {
  return (
    <MiniFigure
      moodY={-4}
      headTilt={-2}
      lookDir={2}
      hunch={4}
      armL={[0, 4]}
      armR={[0, 4]}
      size={size}
    />
  );
}

function AJLonely({ size = 64 }) {
  return (
    <MiniFigure
      moodY={-2}
      headTilt={-1}
      lookDir={1}
      armsCross={true}
      size={size}
    />
  );
}

function AJHeartbroken({ size = 64 }) {
  return (
    <MiniFigure
      moodY={-5}
      headTilt={-4}
      lookDir={3}
      hunch={8}
      armL={[6, -4]}
      armR={[-6, -4]}
      size={size}
    />
  );
}

function AJWalking({ size = 64 }) {
  return (
    <MiniFigure
      moodY={1}
      headTilt={1}
      lookDir={0}
      legsOpen={true}
      legFwd="right"
      armL={[0, -8]}
      armR={[0, 8]}
      size={size}
    />
  );
}

function AJWalkA() {
  return (
    <MiniFigure moodY={-3} headTilt={-2} lookDir={2} hunch={3} size={70} />
  );
}

function AJWalkB() {
  return (
    <MiniFigure
      moodY={2}
      headTilt={2}
      lookDir={-1}
      legsOpen={true}
      legFwd="left"
      armL={[0, 6]}
      armR={[0, -6]}
      size={90}
    />
  );
}

const MOODS = [
  { label: 'Hopeful', Component: AJHopeful },
  { label: 'Neutral', Component: AJNeutral },
  { label: 'Sad', Component: AJSad },
  { label: 'Lonely', Component: AJLonely },
  { label: 'Heartbroken', Component: AJHeartbroken },
  { label: 'Walking', Component: AJWalking },
];
