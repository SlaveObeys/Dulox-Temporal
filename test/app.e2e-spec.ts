import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('💀');
  });

  describe('/forms/cotizar-proyecto', () => {
    it('should fail with 400 when required fields are missing', () => {
      return request(app.getHttpServer())
        .post('/forms/cotizar-proyecto')
        .send({})
        .expect(400);
    });

    it('should successfully submit project quotation with projectTitle and projectUrl', async () => {
      const response = await request(app.getHttpServer())
        .post('/forms/cotizar-proyecto')
        .send({
          nombre: 'Juan Pérez',
          empresa: 'Arquitectura & Diseño SpA',
          email: 'juan.perez@example.com',
          telefono: '912345678',
          direccion: 'Av. Providencia 1234, Providencia, Santiago',
          mensaje: 'Necesitamos cotizar la fabricación completa para este proyecto.',
          projectTitle: 'Cocina Industrial Acero Inoxidable Premium',
          projectUrl: 'https://dulox.cl/pages/proyectos/cocina-industrial-inox',
          clienteId: 'sh_98765',
          'g-recaptcha-response': 'dev-token-dulox-test',
        })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('id');
    });

    it('should successfully submit general project quotation (without project preview)', async () => {
      const response = await request(app.getHttpServer())
        .post('/forms/cotizacion-proyecto')
        .send({
          nombre: 'María González',
          empresa: 'Inmobiliaria Futuro',
          email: 'maria.gonzalez@example.com',
          telefono: '987654321',
          direccion: 'Las Condes 5678, Santiago',
          mensaje: 'Cotización desde el botón del inicio para un nuevo local comercial.',
          'g-recaptcha-response': 'dev-token-dulox-test',
        })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('/forms/trabaja-con-nosotros', () => {
    it('should fail with 400 when CV file is missing', () => {
      return request(app.getHttpServer())
        .post('/forms/trabaja-con-nosotros')
        .field('nombre', 'Esteban Paredes')
        .field('email', 'esteban@example.com')
        .field('mensaje', 'Me interesa mucho postular al equipo técnico de Dulox.')
        .field('g-recaptcha-response', 'dev-token-dulox-test')
        .expect(400);
    });

    it('should fail with 400 when file extension is not pdf or word', () => {
      return request(app.getHttpServer())
        .post('/forms/trabaja-con-nosotros')
        .field('nombre', 'Esteban Paredes')
        .field('email', 'esteban@example.com')
        .field('mensaje', 'Me interesa mucho postular al equipo técnico de Dulox.')
        .field('g-recaptcha-response', 'dev-token-dulox-test')
        .attach('cv', Buffer.from('archivo texto plano'), 'curriculum.txt')
        .expect(400);
    });

    it('should successfully submit job application with attached PDF CV', async () => {
      const dummyPdf = Buffer.from('%PDF-1.4 dummy pdf content for testing');

      const response = await request(app.getHttpServer())
        .post('/forms/trabaja-con-nosotros')
        .field('nombre', 'Esteban Paredes')
        .field('email', 'esteban.paredes@example.com')
        .field('telefono', '912345678')
        .field('mensaje', 'Me interesa mucho postular al equipo técnico de Dulox por mi experiencia en manufactura.')
        .field('g-recaptcha-response', 'dev-token-dulox-test')
        .attach('cv', dummyPdf, 'CV_Esteban_Paredes.pdf')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('id');
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
