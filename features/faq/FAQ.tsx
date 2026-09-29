import { faqs } from './faq.data';
export function FAQ({ compact = false }: { compact?: boolean }) {
  return (
    <div className="faq-list">
      {(compact ? faqs.slice(0, 4) : faqs).map((item, i) => (
        <details className="faq-item" key={item.question} open={compact && i === 0}>
          <summary>
            {item.question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
