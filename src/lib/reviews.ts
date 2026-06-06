interface Testimonial {
  data: { rating: number; draft?: boolean };
}

export interface AggregateRating {
  average: number;
  count: number;
}

export function computeAggregateRating(testimonials: Testimonial[]): AggregateRating {
  const live = testimonials.filter((t) => !t.data.draft);
  if (live.length === 0) return { average: 0, count: 0 };
  const sum = live.reduce((acc, t) => acc + t.data.rating, 0);
  return {
    average: Math.round((sum / live.length) * 10) / 10,
    count: live.length,
  };
}
