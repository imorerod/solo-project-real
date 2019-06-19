--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: approved; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.approved (
    id integer NOT NULL,
    name character varying(80) NOT NULL,
    number character varying(20) NOT NULL
);


--
-- Name: approved_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.approved_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: approved_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.approved_id_seq OWNED BY public.approved.id;


--
-- Name: child; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.child (
    id integer NOT NULL,
    name character varying(80) NOT NULL,
    number character varying(20) NOT NULL
);


--
-- Name: child_approved; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.child_approved (
    id integer NOT NULL,
    child_id integer,
    approved_id integer
);


--
-- Name: child_approved_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.child_approved_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: child_approved_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.child_approved_id_seq OWNED BY public.child_approved.id;


--
-- Name: child_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.child_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: child_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.child_id_seq OWNED BY public.child.id;


--
-- Name: child_non_approved; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.child_non_approved (
    id integer NOT NULL,
    child_id integer,
    non_approved_id integer
);


--
-- Name: child_non_approved_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.child_non_approved_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: child_non_approved_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.child_non_approved_id_seq OWNED BY public.child_non_approved.id;


--
-- Name: non_approved; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.non_approved (
    id integer NOT NULL,
    number character varying(20) NOT NULL,
    "time" timestamp without time zone NOT NULL,
    reviewed boolean DEFAULT false
);


--
-- Name: non_approved_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.non_approved_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: non_approved_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.non_approved_id_seq OWNED BY public.non_approved.id;


--
-- Name: parent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.parent (
    id integer NOT NULL,
    username character varying(80) NOT NULL,
    password character varying(1000) NOT NULL
);


--
-- Name: parent_child; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.parent_child (
    id integer NOT NULL,
    parent_id integer,
    child_id integer
);


--
-- Name: parent_child_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.parent_child_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: parent_child_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.parent_child_id_seq OWNED BY public.parent_child.id;


--
-- Name: parent_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.parent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: parent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.parent_id_seq OWNED BY public.parent.id;


--
-- Name: approved id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.approved ALTER COLUMN id SET DEFAULT nextval('public.approved_id_seq'::regclass);


--
-- Name: child id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.child ALTER COLUMN id SET DEFAULT nextval('public.child_id_seq'::regclass);


--
-- Name: child_approved id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.child_approved ALTER COLUMN id SET DEFAULT nextval('public.child_approved_id_seq'::regclass);


--
-- Name: child_non_approved id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.child_non_approved ALTER COLUMN id SET DEFAULT nextval('public.child_non_approved_id_seq'::regclass);


--
-- Name: non_approved id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.non_approved ALTER COLUMN id SET DEFAULT nextval('public.non_approved_id_seq'::regclass);


--
-- Name: parent id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.parent ALTER COLUMN id SET DEFAULT nextval('public.parent_id_seq'::regclass);


--
-- Name: parent_child id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.parent_child ALTER COLUMN id SET DEFAULT nextval('public.parent_child_id_seq'::regclass);


--
-- Data for Name: approved; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.approved (id, name, number) FROM stdin;
109	Dad	(098) 765-4321
108	Mom	(123) 456-7880
\.


--
-- Data for Name: child; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.child (id, name, number) FROM stdin;
13	Charlie	913-111-1111
16	River	913-222-2222
17	Maya	913-999-9999
29	Winnie	(098) 765-4321
31	Winnie	(111) 111-1133
\.


--
-- Data for Name: child_approved; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.child_approved (id, child_id, approved_id) FROM stdin;
89	13	108
90	16	109
\.


--
-- Data for Name: child_non_approved; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.child_non_approved (id, child_id, non_approved_id) FROM stdin;
1	13	1
2	16	2
3	17	3
4	13	4
\.


--
-- Data for Name: non_approved; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.non_approved (id, number, "time", reviewed) FROM stdin;
2	319-555-3333	2019-05-22 10:05:06	f
1	319-555-4444	2019-05-20 04:05:06	t
3	319-555-2222	2019-05-26 12:05:06	f
4	319-098-7654	2019-06-01 13:01:56	f
\.


--
-- Data for Name: parent; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.parent (id, username, password) FROM stdin;
1	imorerod	password
\.


--
-- Data for Name: parent_child; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.parent_child (id, parent_id, child_id) FROM stdin;
5	1	13
6	1	16
7	1	17
17	1	31
\.


--
-- Name: approved_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.approved_id_seq', 111, true);


--
-- Name: child_approved_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.child_approved_id_seq', 92, true);


--
-- Name: child_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.child_id_seq', 31, true);


--
-- Name: child_non_approved_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.child_non_approved_id_seq', 1, false);


--
-- Name: non_approved_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.non_approved_id_seq', 2, true);


--
-- Name: parent_child_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.parent_child_id_seq', 17, true);


--
-- Name: parent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.parent_id_seq', 8, true);


--
-- Name: approved approved_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.approved
    ADD CONSTRAINT approved_pkey PRIMARY KEY (id);


--
-- Name: child_approved child_approved_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.child_approved
    ADD CONSTRAINT child_approved_pkey PRIMARY KEY (id);


--
-- Name: child_non_approved child_non_approved_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.child_non_approved
    ADD CONSTRAINT child_non_approved_pkey PRIMARY KEY (id);


--
-- Name: child child_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.child
    ADD CONSTRAINT child_pkey PRIMARY KEY (id);


--
-- Name: non_approved non_approved_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.non_approved
    ADD CONSTRAINT non_approved_number_key UNIQUE (number);


--
-- Name: non_approved non_approved_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.non_approved
    ADD CONSTRAINT non_approved_pkey PRIMARY KEY (id);


--
-- Name: parent_child parent_child_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.parent_child
    ADD CONSTRAINT parent_child_pkey PRIMARY KEY (id);


--
-- Name: parent parent_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.parent
    ADD CONSTRAINT parent_pkey PRIMARY KEY (id);


--
-- Name: parent parent_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.parent
    ADD CONSTRAINT parent_username_key UNIQUE (username);


--
-- Name: child_approved child_approved_approved_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.child_approved
    ADD CONSTRAINT child_approved_approved_id_fkey FOREIGN KEY (approved_id) REFERENCES public.approved(id);


--
-- Name: child_approved child_approved_child_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.child_approved
    ADD CONSTRAINT child_approved_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.child(id);


--
-- Name: child_non_approved child_non_approved_child_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.child_non_approved
    ADD CONSTRAINT child_non_approved_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.child(id);


--
-- Name: child_non_approved child_non_approved_non_approved_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.child_non_approved
    ADD CONSTRAINT child_non_approved_non_approved_id_fkey FOREIGN KEY (non_approved_id) REFERENCES public.non_approved(id);


--
-- Name: parent_child parent_child_child_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.parent_child
    ADD CONSTRAINT parent_child_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.child(id);


--
-- Name: parent_child parent_child_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.parent_child
    ADD CONSTRAINT parent_child_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.parent(id);


--
-- PostgreSQL database dump complete
--

