type GlobalEffectsProps = {
  glitchActive: boolean;
  glitchLabel: string;
  glitchIntensity: 'soft' | 'hard';
  effectsEnabled: boolean;
};

export const GlobalEffects = ({ glitchActive, glitchLabel, glitchIntensity, effectsEnabled }: GlobalEffectsProps) => (
  <>
    {effectsEnabled ? (
      <>
        <div className="noise-field" aria-hidden="true" />
        <div className="scanline-field" aria-hidden="true" />
        <div className="crt-vignette" aria-hidden="true" />
      </>
    ) : null}
    <div
      className={`global-glitch ${glitchActive ? 'is-active' : ''} ${glitchIntensity === 'hard' ? 'is-hard' : ''}`}
      aria-hidden="true"
    >
      {glitchLabel ? <span className="global-glitch__label">{glitchLabel}</span> : null}
    </div>
  </>
);
