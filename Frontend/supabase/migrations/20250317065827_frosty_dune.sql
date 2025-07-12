
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'messages' AND column_name = 'title'
  ) THEN
    ALTER TABLE messages ADD COLUMN title text;
  END IF;
END $$;

