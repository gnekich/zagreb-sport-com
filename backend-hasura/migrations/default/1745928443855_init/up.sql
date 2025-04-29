SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.dogadjaj (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text,
    address text,
    long_lat text,
    od timestamp with time zone,
    "do" timestamp with time zone,
    slika_url text,
    publish_type text DEFAULT 'public'::text
);
CREATE TABLE public.dokumenti_saveza (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    dokument_url text,
    savez_id uuid,
    naziv text,
    opis text,
    tip_dokumenta text
);
CREATE TABLE public.feed (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    subject text,
    savez_id uuid,
    slika_url text,
    description text,
    meta_fields json,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);
CREATE TABLE public.natjecatelji (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    ime text NOT NULL,
    prezime text NOT NULL
);
CREATE TABLE public.rezultati (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    savez_id text,
    payload json,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);
CREATE TABLE public.savezi (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text,
    kontakt_email text,
    web_url text
);
CREATE TABLE public.sports (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);
COMMENT ON TABLE public.sports IS 'Table containing the list of sports';
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
COMMENT ON TABLE public.users IS 'Users table';
CREATE TABLE public.users_savez_access (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    savez_id uuid NOT NULL,
    access_role text DEFAULT 'editor'::text
);
COMMENT ON TABLE public.users_savez_access IS 'Table containing the list access types for a user';
ALTER TABLE ONLY public.dogadjaj
    ADD CONSTRAINT dogadjaj_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.dokumenti_saveza
    ADD CONSTRAINT dokumenti_saveza_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.feed
    ADD CONSTRAINT feed_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.natjecatelji
    ADD CONSTRAINT natjecatelji_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.rezultati
    ADD CONSTRAINT rezultati_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.savezi
    ADD CONSTRAINT savezi_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sports
    ADD CONSTRAINT sports_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users_savez_access
    ADD CONSTRAINT users_savez_access_pkey PRIMARY KEY (id);
CREATE TRIGGER set_public_feed_updated_at BEFORE UPDATE ON public.feed FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_feed_updated_at ON public.feed IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_rezultati_updated_at BEFORE UPDATE ON public.rezultati FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_rezultati_updated_at ON public.rezultati IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_sports_updated_at BEFORE UPDATE ON public.sports FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_sports_updated_at ON public.sports IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_users_updated_at ON public.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';
