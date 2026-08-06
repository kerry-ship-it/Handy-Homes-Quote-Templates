import { FormEvent, useState } from 'react';

type Screen = 'intro' | 'review' | 'payment' | 'confirmation';
type IconName =
  | 'arrowLeft'
  | 'bell'
  | 'calendar'
  | 'card'
  | 'check'
  | 'checkCircle'
  | 'close'
  | 'document'
  | 'home'
  | 'info'
  | 'lock'
  | 'menu'
  | 'shield'
  | 'support'
  | 'user';

type GutterAssetStatus = 'Verified' | 'Estimated';

type GutterAsset = {
  id: 'main-house' | 'detached-garage';
  assetName: string;
  assetType: 'Gutters';
  size: number | null;
  complexity: number;
  unitPrice: number;
};

type QuoteLine = {
  id: 'main-house' | 'detached-garage';
  assetName: string;
  productName: 'Gutter cleaning';
  quantity: number;
  measurement: string;
  price: number;
  status: GutterAssetStatus;
};

const customer = {
  name: 'Evelyn Parker',
  street: '42 Maple Ridge Drive',
  cityStateZip: 'Middletown, NJ 07748',
  houseSize: 2400,
};

const gutterAssets: GutterAsset[] = [
  {
    id: 'main-house',
    assetName: 'Main house',
    assetType: 'Gutters',
    size: 186,
    complexity: 1,
    unitPrice: 0.55,
  },
  {
    id: 'detached-garage',
    assetName: 'Detached garage',
    assetType: 'Gutters',
    size: 42,
    complexity: 1,
    unitPrice: 0.55,
  },
];

const instantPriceTiers = [
  { minimumHouseSize: 0, maximumHouseSize: 1999, quantity: 180 },
  { minimumHouseSize: 2000, maximumHouseSize: 2999, quantity: 228 },
  { minimumHouseSize: 3000, maximumHouseSize: Infinity, quantity: 280 },
];

function getInstantPriceQuantity(houseSize: number) {
  return (
    instantPriceTiers.find(
      (tier) =>
        houseSize >= tier.minimumHouseSize &&
        houseSize <= tier.maximumHouseSize,
    )?.quantity ?? 0
  );
}

function buildQuoteLine(asset: GutterAsset): QuoteLine {
  const measuredSize = asset.size ?? 0;
  const hasMeasuredSize = measuredSize > 0;
  const quantity = hasMeasuredSize
    ? measuredSize
    : getInstantPriceQuantity(customer.houseSize);
  const status: GutterAssetStatus = hasMeasuredSize ? 'Verified' : 'Estimated';

  return {
    id: asset.id,
    assetName: asset.assetName,
    productName: 'Gutter cleaning',
    quantity,
    measurement: `${quantity} ${status === 'Estimated' ? 'estimated ' : ''}linear ft`,
    price: Math.round(quantity * asset.complexity * asset.unitPrice),
    status,
  };
}

const quoteLines = gutterAssets
  .filter((asset) => asset.assetType === 'Gutters')
  .map(buildQuoteLine);

const pricePerCleaning = quoteLines.reduce(
  (total, line) => total + line.price,
  0,
);

const hasEstimatedPrice = quoteLines.some(
  (line) => line.status === 'Estimated',
);

const assurances = [
  {
    title: 'Pay as you go',
    description:
      'There is no enrollment fee. Pay only after each completed cleaning.',
  },
  {
    title: 'Cancel anytime',
    description:
      'Skip or cancel a future visit before service without a cancellation fee.',
  },
  {
    title: 'Stay informed',
    description:
      'We send your service window and a reminder before each scheduled visit.',
  },
  {
    title: 'Know your price',
    description:
      'We verify your gutter details and confirm the visit price before service.',
  },
];

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const iconPaths: Record<IconName, string[]> = {
  arrowLeft: ['M19 12H5', 'm11 7-5 5 5 5'],
  bell: [
    'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9',
    'M10 21h4',
  ],
  calendar: [
    'M6 3v3',
    'M18 3v3',
    'M4 8h16',
    'M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z',
    'M8 12h2v2H8z',
    'M14 12h2v2h-2z',
  ],
  card: ['M3 6.5h18v11H3z', 'M3 10h18', 'M7 14h4'],
  check: ['m5 12 4.2 4.2L19 7'],
  checkCircle: [
    'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    'm7.5 12 3 3 6-6',
  ],
  close: ['m6 6 12 12', 'M18 6 6 18'],
  document: [
    'M6 3h8l4 4v14H6z',
    'M14 3v5h5',
    'M9 13h6',
    'M9 17h6',
  ],
  home: ['M3.5 10.8 12 4l8.5 6.8V20H15v-5.5H9V20H3.5v-9.2Z'],
  info: ['M12 10.5V17', 'M12 7.2v.2', 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'],
  lock: ['M7 10V8a5 5 0 0 1 10 0v2', 'M5 10h14v11H5z', 'M12 14v3'],
  menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  shield: [
    'M12 3 5.5 5.8v5.4c0 4.2 2.7 8 6.5 9.8 3.8-1.8 6.5-5.6 6.5-9.8V5.8L12 3Z',
    'm9 12 2 2 4-4',
  ],
  support: [
    'M4 14v-2a8 8 0 0 1 16 0v2',
    'M4 14H2v5h4v-5H4Z',
    'M20 14h2v5h-4v-5h2Z',
    'M18 20c-1 1-2.5 1-4 1',
  ],
  user: [
    'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
    'M4.5 21a7.5 7.5 0 0 1 15 0',
  ],
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {iconPaths[name].map((path) => (
        <path d={path} key={path} />
      ))}
    </svg>
  );
}

function Brand() {
  return (
    <span className="brand">
      <img src="/handy-homes-logo.png" alt="Handy Homes" />
    </span>
  );
}

function SiteHeader({
  menuOpen,
  onMenuToggle,
  onNavigate,
}: {
  menuOpen: boolean;
  onMenuToggle: () => void;
  onNavigate: (screen: Screen) => void;
}) {
  return (
    <header className="site-header">
      <button
        className="brand-button"
        type="button"
        onClick={() => onNavigate('intro')}
        aria-label="Go to GutterCare home"
      >
        <Brand />
      </button>
      <button
        className="menu-button"
        type="button"
        onClick={onMenuToggle}
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        <Icon name={menuOpen ? 'close' : 'menu'} />
      </button>
      {menuOpen && (
        <nav id="site-menu" className="site-menu" aria-label="Main menu">
          <button type="button" onClick={() => onNavigate('intro')}>
            GutterCare home
          </button>
          <button type="button" onClick={() => onNavigate('review')}>
            Review my plan
          </button>
          <a href="tel:+18668372050">Call (866) 837-2050</a>
        </nav>
      )}
    </header>
  );
}

function PrimaryButton({
  children,
  disabled,
  onClick,
  type = 'button',
}: {
  children: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      className="primary-button"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function StepHeader({
  step,
  title,
  onBack,
}: {
  step: 1 | 2 | 3;
  title: string;
  onBack: () => void;
}) {
  return (
    <section className="step-header">
      <button
        className="back-button"
        type="button"
        onClick={onBack}
        aria-label="Go back"
      >
        <Icon name="arrowLeft" />
      </button>
      <p>Step {step} of 3</p>
      <h1 tabIndex={-1}>{title}</h1>
    </section>
  );
}

function Benefit({
  icon,
  children,
}: {
  icon: IconName;
  children: string;
}) {
  return (
    <div className="benefit">
      <span className="benefit__icon">
        <Icon name={icon} />
      </span>
      <span>{children}</span>
    </div>
  );
}

function IntroScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <main id="main-content" className="intro-screen">
      <section className="intro-hero">
        <img
          src="/guttercare-hero.png"
          alt="White home with clean gutters in warm morning light"
        />
        <div className="intro-hero__overlay">
          <h1 tabIndex={-1}>GutterCare</h1>
          <h2>Four cleanings. One easy plan.</h2>
          <p>We schedule and remind you before each gutter cleaning.</p>
        </div>
      </section>

      <section className="intro-enrollment" aria-labelledby="enrollment-title">
        <span className="intro-enrollment__shield">
          <Icon name="shield" />
        </span>
        <p className="intro-enrollment__eyebrow">Your plan at a glance</p>
        <h2 id="enrollment-title">4 scheduled gutter cleanings per year</h2>
        <ul className="plan-inclusions">
          <li>
            <Icon name="check" />
            Main house and detached garage included
          </li>
          <li>
            <Icon name="check" />
            {currency.format(pricePerCleaning)}
            {hasEstimatedPrice ? ' estimated' : ''} after each completed
            cleaning
          </li>
          <li>
            <Icon name="check" />
            Skip or cancel before any visit
          </li>
        </ul>
        <div className="intro-due">
          <strong>{currency.format(0)}</strong>
          <span>due today</span>
        </div>
        <p className="intro-due__note">
          Enrollment is free. You pay only after completed service.
        </p>
        <PrimaryButton onClick={onContinue}>
          Review my plan and price
        </PrimaryButton>
      </section>

      <section className="benefits" aria-label="GutterCare benefits">
        <Benefit icon="calendar">4 cleanings each year</Benefit>
        <Benefit icon="home">Main house and garage</Benefit>
        <Benefit icon="shield">Pay after completed service</Benefit>
      </section>

      <section className="about-handy-homes" aria-labelledby="about-title">
        <div className="about-handy-homes__intro">
          <p className="about-handy-homes__eyebrow">New to Handy Homes?</p>
          <h2 id="about-title">Home maintenance, handled with care.</h2>
          <p>
            Handy Homes helps homeowners stay ahead of recurring home
            maintenance. GutterCare is our pay-as-you-go gutter cleaning
            service, with scheduled visits, clear reminders, and support when
            you need it.
          </p>
          <a href="tel:+18668372050">
            <Icon name="support" />
            Questions? Call (866) 837-2050
          </a>
        </div>
        <div className="assurance-grid" aria-label="GutterCare promises">
          {assurances.map((assurance) => (
            <article className="assurance-card" key={assurance.title}>
              <span className="assurance-card__check">
                <Icon name="check" />
              </span>
              <div>
                <h3>{assurance.title}</h3>
                <p>{assurance.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function CustomerSummary() {
  return (
    <section className="customer-summary" aria-label="Customer and property">
      <span className="customer-summary__icon">
        <Icon name="user" />
      </span>
      <div>
        <h2>{customer.name}</h2>
        <p>{customer.street}</p>
        <p>{customer.cityStateZip}</p>
      </div>
    </section>
  );
}

function QuoteLineItem({ line }: { line: QuoteLine }) {
  return (
    <article className="quote-line">
      <span className="quote-line__icon">
        {line.id === 'main-house' ? (
          <Icon name="home" />
        ) : (
          <img src="/garage-icon.svg" alt="" />
        )}
      </span>
      <div className="quote-line__name">
        <h3>{line.assetName}</h3>
        <p>{line.productName}</p>
      </div>
      <div className="quote-line__price">
        <p>{line.measurement}</p>
        <strong>{currency.format(line.price)} per cleaning</strong>
      </div>
    </article>
  );
}

function ReviewScreen({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <main id="main-content" className="flow-screen">
      <StepHeader
        step={1}
        title="Review your GutterCare plan"
        onBack={onBack}
      />
      <div className="flow-content review-layout">
        <div>
          <CustomerSummary />
          <section className="price-section" aria-labelledby="price-title">
            <div className="section-heading">
              <h2 id="price-title">
                {hasEstimatedPrice ? 'Estimated price' : 'Price per cleaning'}
              </h2>
              {hasEstimatedPrice && (
                <span className="status status--estimated">
                  <Icon name="info" />
                  Estimated
                </span>
              )}
            </div>
            <p className="price-explainer">
              {hasEstimatedPrice
                ? 'We used your home size to estimate missing gutter measurements. We will confirm them before service.'
                : 'Your price is based on the gutter measurements saved for your home.'}
            </p>
            <div className="quote-lines">
              {quoteLines.map((line) => (
                <QuoteLineItem line={line} key={line.id} />
              ))}
            </div>
            <article className="enrollment-line">
              <span className="enrollment-line__icon">
                <Icon name="shield" />
              </span>
              <div>
                <h3>GutterCare</h3>
                <p>4 scheduled cleanings per year · Free enrollment</p>
              </div>
              <div className="enrollment-line__price">
                <strong>{currency.format(0)}</strong>
                <p>Pay only after completed service</p>
              </div>
            </article>
          </section>
        </div>

        <aside className="review-summary" aria-label="Amount due today">
          <p>Due today</p>
          <strong>{currency.format(0)}</strong>
          <span>
            Enrollment is free. Add a card next; nothing will be charged
            today.
          </span>
          <PrimaryButton onClick={onContinue}>Enroll now</PrimaryButton>
        </aside>
      </div>
      <div className="mobile-action">
        <div>
          <strong>{currency.format(0)}</strong>
          <span>due today</span>
        </div>
        <PrimaryButton onClick={onContinue}>Enroll now</PrimaryButton>
      </div>
    </main>
  );
}

function FormField({
  autoComplete,
  inputMode,
  label,
  maxLength,
  name,
  onChange,
  placeholder,
  value,
}: {
  autoComplete: string;
  inputMode: 'numeric';
  label: string;
  maxLength: number;
  name: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}) {
  return (
    <label className="form-field">
      <span>{label}</span>
      <input
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
        required
      />
    </label>
  );
}

function PaymentScreen({
  onBack,
  onComplete,
  onDoLater,
}: {
  onBack: () => void;
  onComplete: (lastFour: string) => void;
  onDoLater: () => void;
}) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [zip, setZip] = useState('');
  const [authorized, setAuthorized] = useState(false);

  const cardDigits = cardNumber.replace(/\D/g, '');
  const formComplete =
    cardDigits.length >= 12 &&
    expiry.replace(/\D/g, '').length === 4 &&
    cvc.replace(/\D/g, '').length >= 3 &&
    zip.replace(/\D/g, '').length === 5 &&
    authorized;

  function formatCard(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(digits.replace(/(\d{4})(?=\d)/g, '$1 '));
  }

  function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    setExpiry(
      digits.length > 2
        ? `${digits.slice(0, 2)} / ${digits.slice(2)}`
        : digits,
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formComplete) {
      onComplete(cardDigits.slice(-4));
    }
  }

  return (
    <main id="main-content" className="flow-screen">
      <StepHeader
        step={2}
        title="Add a payment method"
        onBack={onBack}
      />
      <form className="flow-content payment-content" onSubmit={handleSubmit}>
        <section className="payment-intro">
          <h2>
            <strong>{currency.format(0)}</strong> due today
          </h2>
          <p>
            Add a card now, or finish enrolling and provide payment details
            later. Nothing will be charged today.
          </p>
        </section>

        <section className="card-form" aria-label="Payment details">
          <FormField
            autoComplete="cc-number"
            inputMode="numeric"
            label="Card number"
            maxLength={19}
            name="card-number"
            onChange={formatCard}
            placeholder="••••  ••••  ••••  ••••"
            value={cardNumber}
          />
          <div className="card-form__row">
            <FormField
              autoComplete="cc-exp"
              inputMode="numeric"
              label="MM / YY"
              maxLength={7}
              name="expiry"
              onChange={formatExpiry}
              placeholder="•• / ••"
              value={expiry}
            />
            <FormField
              autoComplete="cc-csc"
              inputMode="numeric"
              label="CVC"
              maxLength={4}
              name="cvc"
              onChange={(value) =>
                setCvc(value.replace(/\D/g, '').slice(0, 4))
              }
              placeholder="•••"
              value={cvc}
            />
            <FormField
              autoComplete="postal-code"
              inputMode="numeric"
              label="Billing ZIP"
              maxLength={5}
              name="zip"
              onChange={(value) =>
                setZip(value.replace(/\D/g, '').slice(0, 5))
              }
              placeholder="•••••"
              value={zip}
            />
          </div>
          <p className="secure-note">
            <Icon name="lock" />
            Secure payment setup
          </p>
        </section>

        <section className="payment-note">
          <span>
            <Icon name="document" />
          </span>
          <p>
            After each completed cleaning, we will charge the confirmed visit
            price and send a receipt.
          </p>
        </section>

        <label className="authorization">
          <input
            type="checkbox"
            checked={authorized}
            onChange={(event) => setAuthorized(event.target.checked)}
          />
          <span>
            I authorize Handy Homes to save this card and charge it after
            completed GutterCare visits.
          </span>
        </label>

        <div className="payment-action">
          <PrimaryButton type="submit" disabled={!formComplete}>
            Complete enrollment
          </PrimaryButton>
          <button
            type="button"
            className="payment-later-button"
            onClick={onDoLater}
          >
            Do this later
          </button>
          <div className="payment-deadline" role="note">
            <Icon name="info" />
            <p>
              Payment details are required at least 5 days before your
              scheduled service. Without them, we will not be able to provide
              the service.
            </p>
          </div>
          <p>This local preview does not process or store card information.</p>
        </div>
      </form>
    </main>
  );
}

function ConfirmationInfo({
  icon,
  title,
  detail,
}: {
  icon: IconName;
  title: string;
  detail?: string;
}) {
  return (
    <div className="confirmation-info">
      <span>
        <Icon name={icon} />
      </span>
      <div>
        <h2>{title}</h2>
        {detail && <p>{detail}</p>}
      </div>
    </div>
  );
}

function ConfirmationScreen({
  lastFour,
  onBack,
  onViewPlan,
}: {
  lastFour: string | null;
  onBack: () => void;
  onViewPlan: () => void;
}) {
  const nextSteps = [
    hasEstimatedPrice
      ? 'We will verify your gutter measurements'
      : 'We will confirm your service details',
    'We will send your first cleaning window',
    'You will receive a reminder before service',
  ];

  return (
    <main id="main-content" className="flow-screen">
      <StepHeader
        step={3}
        title="You’re enrolled in GutterCare"
        onBack={onBack}
      />
      <div className="flow-content confirmation-content">
        <section className="confirmation-outcome">
          <span>
            <Icon name="checkCircle" />
          </span>
          <h2>Nothing was charged today.</h2>
        </section>

        <section className="confirmation-details" aria-label="Plan details">
          <ConfirmationInfo
            icon="home"
            title={customer.name}
            detail={customer.street}
          />
          <ConfirmationInfo
            icon="calendar"
            title="4 scheduled cleanings per year"
            detail={`${currency.format(pricePerCleaning)}${
              hasEstimatedPrice ? ' estimated' : ''
            } per completed cleaning`}
          />
          {lastFour ? (
            <ConfirmationInfo
              icon="card"
              title={`Card ending in ${lastFour}`}
            />
          ) : (
            <ConfirmationInfo
              icon="card"
              title="Payment details needed"
              detail="Add them at least 5 days before your scheduled service so we can provide the service."
            />
          )}
        </section>

        <section className="next-steps" aria-labelledby="next-steps-title">
          <h2 id="next-steps-title">What happens next</h2>
          <ol>
            {nextSteps.map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="confirmation-action">
          <PrimaryButton onClick={onViewPlan}>
            View my GutterCare plan
          </PrimaryButton>
          <a href="tel:+18668372050">
            <Icon name="support" />
            Need help? Contact support
          </a>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastFour, setLastFour] = useState<string | null>(null);

  function navigate(nextScreen: Screen) {
    setMenuOpen(false);
    setScreen(nextScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('h1')?.focus();
    });
  }

  function completeEnrollment(cardLastFour: string) {
    setLastFour(cardLastFour);
    navigate('confirmation');
  }

  function completeEnrollmentWithoutPayment() {
    setLastFour(null);
    navigate('confirmation');
  }

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onNavigate={navigate}
      />
      {screen === 'intro' && (
        <IntroScreen onContinue={() => navigate('review')} />
      )}
      {screen === 'review' && (
        <ReviewScreen
          onBack={() => navigate('intro')}
          onContinue={() => navigate('payment')}
        />
      )}
      {screen === 'payment' && (
        <PaymentScreen
          onBack={() => navigate('review')}
          onComplete={completeEnrollment}
          onDoLater={completeEnrollmentWithoutPayment}
        />
      )}
      {screen === 'confirmation' && (
        <ConfirmationScreen
          lastFour={lastFour}
          onBack={() => navigate('payment')}
          onViewPlan={() => navigate('review')}
        />
      )}
    </div>
  );
}
