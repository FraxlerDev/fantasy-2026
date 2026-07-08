CREATE TABLE IF NOT EXISTS "ChatMessageView" (
  "id" TEXT NOT NULL,
  "messageId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ChatMessageView_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ChatMessageView_messageId_userId_key"
  ON "ChatMessageView"("messageId", "userId");

CREATE INDEX IF NOT EXISTS "ChatMessageView_messageId_idx"
  ON "ChatMessageView"("messageId");

CREATE INDEX IF NOT EXISTS "ChatMessageView_userId_idx"
  ON "ChatMessageView"("userId");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'ChatMessageView_messageId_fkey'
  ) THEN
    ALTER TABLE "ChatMessageView"
      ADD CONSTRAINT "ChatMessageView_messageId_fkey"
      FOREIGN KEY ("messageId") REFERENCES "ChatMessage"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'ChatMessageView_userId_fkey'
  ) THEN
    ALTER TABLE "ChatMessageView"
      ADD CONSTRAINT "ChatMessageView_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
