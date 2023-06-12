import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  // Only for authenticated users
  create: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input: { text }, ctx }) => {
      const tweet = await ctx.prisma.tweet.create({
        data: {
          content: text,
          userId: ctx.session.user.id,
        },
      });

      return tweet;
    }),
});
