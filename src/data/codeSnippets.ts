export type CodeSnippet = {
  label: string;
  language: 'typescript' | 'rust';
  code: string;
  typo?: {
    match: string;
    wrong: string;
  };
};

const riskScoring = `// Risk scoring - payload analysis
const score = await aegisNative.calculateRisk({
  ip: req.ip,
  sessionId: req.session.id,
  payload: req.body,
  route: req.url,
});

if (score >= RISK_BLOCK_THRESHOLD) {
  throw new ForbiddenError('High-risk request blocked');
}`;

export const codeSnippets: CodeSnippet[] = [
  {
    label: 'AegisCore - Risk Scoring',
    language: 'typescript',
    code: riskScoring,
    typo: {
      match: 'const score',
      wrong: 'cosnt score'
    }
  },
  {
    label: 'Three.js - Particle System',
    language: 'typescript',
    code: `const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(COUNT * 3);

for (let i = 0; i < COUNT; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particles = new THREE.Points(geometry, material);
scene.add(particles);`
  },
  {
    label: 'Rust - Payload Normalizer',
    language: 'rust',
    code: `#[napi]
pub fn normalize_payload(input: String) -> Result<String> {
    let decoded = urlencoding::decode(&input)
        .map_err(|error| Error::from_reason(error.to_string()))?;

    let canonical = decoded
        .trim()
        .to_lowercase();

    Ok(canonical)
}`
  }
];
