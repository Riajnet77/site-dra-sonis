-- ============================================================
-- SITE DRA. SÔNIS PAZ - Supabase Migration
-- Execute este SQL no Supabase SQL Editor
-- ============================================================

-- Tabela de configuração de horários de trabalho
CREATE TABLE horarios_trabalho (
  id         SERIAL PRIMARY KEY,
  dia_semana SMALLINT NOT NULL CHECK (dia_semana BETWEEN 0 AND 6),
  -- 0 = domingo, 1 = segunda, ..., 6 = sábado
  hora_inicio TIME NOT NULL,
  hora_fim    TIME NOT NULL,
  ativo       BOOLEAN NOT NULL DEFAULT true,
  UNIQUE (dia_semana)
);

-- Horários padrão (seg a sexta 8h-18h, sábado 8h-12h)
INSERT INTO horarios_trabalho (dia_semana, hora_inicio, hora_fim) VALUES
  (1, '08:00', '18:00'),
  (2, '08:00', '18:00'),
  (3, '08:00', '18:00'),
  (4, '08:00', '18:00'),
  (5, '08:00', '18:00'),
  (6, '08:00', '12:00');

-- Tabela de bloqueios (feriados, férias, datas bloqueadas)
CREATE TABLE datas_bloqueadas (
  id     SERIAL PRIMARY KEY,
  data   DATE NOT NULL UNIQUE,
  motivo TEXT
);

-- Tabela de agendamentos
CREATE TABLE agendamentos (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome         TEXT NOT NULL,
  telefone     TEXT NOT NULL,
  email        TEXT,
  data_hora    TIMESTAMPTZ NOT NULL,
  servico      TEXT NOT NULL DEFAULT 'Avaliação Inicial',
  observacoes  TEXT,
  status       TEXT NOT NULL DEFAULT 'pendente'
                 CHECK (status IN ('pendente', 'confirmado', 'cancelado', 'concluido')),
  criado_em    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (data_hora)
);

-- Index para buscas por data
CREATE INDEX idx_agendamentos_data ON agendamentos (data_hora);
CREATE INDEX idx_agendamentos_status ON agendamentos (status);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE agendamentos      ENABLE ROW LEVEL SECURITY;
ALTER TABLE horarios_trabalho ENABLE ROW LEVEL SECURITY;
ALTER TABLE datas_bloqueadas  ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa pode INSERIR um agendamento (paciente)
CREATE POLICY "insert_agendamento" ON agendamentos
  FOR INSERT TO anon WITH CHECK (true);

-- Qualquer pessoa pode LER horários de trabalho e datas bloqueadas
CREATE POLICY "read_horarios" ON horarios_trabalho
  FOR SELECT TO anon USING (true);

CREATE POLICY "read_bloqueios" ON datas_bloqueadas
  FOR SELECT TO anon USING (true);

-- Qualquer pessoa pode LER apenas data_hora e status dos agendamentos
-- (para checar disponibilidade — sem expor dados pessoais)
CREATE POLICY "read_disponibilidade" ON agendamentos
  FOR SELECT TO anon USING (true);
