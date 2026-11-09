"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Star, Send } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Reveal } from "@/components/shared/reveal";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/shared/section";
import type { HomeContent } from "@/data/home";
import { cn } from "@/lib/utils";

type Item = HomeContent["feedback"]["items"][number];

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-label={`${value}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < value ? "fill-[#febc2e] text-[#febc2e]" : "text-ocean-100",
          )}
        />
      ))}
    </div>
  );
}

function FeedbackCard({ item }: { item: Item }) {
  return (
    <figure className="border-border hover:border-ocean-200 hover:shadow-ocean w-80 shrink-0 rounded-3xl border bg-white p-6 transition-[border-color,box-shadow] duration-300">
      <Stars value={item.rating} />
      <blockquote className="text-ink mt-4 text-[15px] leading-relaxed">
        “{item.text}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="from-ocean-100 to-ocean-50 text-ocean-700 grid size-10 place-items-center rounded-full bg-gradient-to-br font-semibold">
          {item.name.split(" ").pop()?.[0]}
        </span>
        <span>
          <span className="text-ink block text-sm font-semibold">
            {item.name}
          </span>
          <span className="text-ink-soft block text-xs">{item.company}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({ items, reverse }: { items: Item[]; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="mask-fade-x group flex overflow-hidden [--marquee-duration:55s] [--marquee-gap:1.25rem]">
      <div
        className={cn(
          "flex shrink-0 gap-5 pr-5 group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {row.map((item, i) => (
          <div key={`${item.name}-${i}`} aria-hidden={i >= items.length}>
            <FeedbackCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewForm({ form: f }: { form: HomeContent["feedback"]["form"] }) {
  const schema = z.object({
    name: z.string().trim().min(2, f.errors.name),
    company: z.string().trim().max(120).optional(),
    message: z.string().trim().min(10, f.errors.message).max(1000),
    rating: z.number().int().min(1, f.errors.rating).max(5),
  });
  type Values = z.infer<typeof schema>;

  const [hover, setHover] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", company: "", message: "", rating: 0 },
  });
  const rating = useWatch({ control, name: "rating" });

  // Giai đoạn 1 chỉ có frontend: chưa gửi lên server, chỉ báo thành công
  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 600));
    toast.success(f.success);
    reset();
  }

  const input =
    "border-input focus:border-ocean-400 focus:ring-ocean-100 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-4";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="border-border mx-auto grid w-full max-w-2xl gap-4 rounded-3xl border bg-white p-6 sm:grid-cols-2 sm:p-8"
    >
      <h3 className="font-heading text-ink text-xl font-bold sm:col-span-2">
        {f.title}
      </h3>
      <label className="flex flex-col gap-1.5">
        <span className="text-ink text-sm font-medium">{f.name}</span>
        <input {...register("name")} className={input} autoComplete="name" />
        {errors.name ? (
          <span className="text-destructive text-xs">
            {errors.name.message}
          </span>
        ) : null}
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-ink text-sm font-medium">{f.company}</span>
        <input
          {...register("company")}
          className={input}
          autoComplete="organization"
        />
      </label>
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <span className="text-ink text-sm font-medium">{f.rating}</span>
        <div
          className="flex gap-1"
          onMouseLeave={() => setHover(0)}
          role="radiogroup"
          aria-label={f.rating}
        >
          {Array.from({ length: 5 }, (_, i) => {
            const v = i + 1;
            const on = v <= (hover || rating);
            return (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={rating === v}
                aria-label={`${v}`}
                onMouseEnter={() => setHover(v)}
                onClick={() => setValue("rating", v, { shouldValidate: true })}
                className="rounded-md p-0.5 transition-transform hover:scale-125"
              >
                <Star
                  className={cn(
                    "size-7 transition-colors",
                    on ? "fill-[#febc2e] text-[#febc2e]" : "text-ocean-100",
                  )}
                />
              </button>
            );
          })}
        </div>
        {errors.rating ? (
          <span className="text-destructive text-xs">
            {errors.rating.message}
          </span>
        ) : null}
      </div>
      <label className="flex flex-col gap-1.5 sm:col-span-2">
        <span className="text-ink text-sm font-medium">{f.message}</span>
        <textarea
          {...register("message")}
          rows={4}
          className={cn(input, "resize-none")}
        />
        {errors.message ? (
          <span className="text-destructive text-xs">
            {errors.message.message}
          </span>
        ) : null}
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="group bg-ocean-600 hover:bg-ocean-700 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-60 sm:col-span-2 sm:justify-self-start"
      >
        {f.submit}
        <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </form>
  );
}

export function FeedbackSection({
  content,
}: {
  content: HomeContent["feedback"];
}) {
  const half = Math.ceil(content.items.length / 2);
  return (
    <Section id="feedback" className="overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          lede={content.lede}
        />
      </Container>
      <Reveal className="flex flex-col gap-5">
        <MarqueeRow items={content.items.slice(0, half)} />
        <MarqueeRow items={content.items.slice(half)} reverse />
      </Reveal>
      <Container className="mt-16">
        <Reveal>
          <ReviewForm form={content.form} />
        </Reveal>
      </Container>
    </Section>
  );
}
