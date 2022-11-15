-- ########################
-- #  Tabla: Interaccion  #
-- ########################

-- Formato:
-- Etiqueta (varchar), Tipo (int), Categoria(varchar), Sucesor_de (int), Link (varchar)

-- Tipos: 
--	1 - Respuesta Directa
--	2 - Menu de opciones
--	3 - Link

INSERT INTO dbo.Interaccion

-- { 1: 'Respuesta Directa' }
SELECT 'Saludo', 1, 'Lenguaje', NULL, NULL 


-- { 2: 'Menús' }
-- PADRES
-- { id: 2, Etiqueta: 'Directorio' }
UNION ALL
SELECT 'Directorio', 2, 'Informacion', NULL, NULL
-- { id: 3, Etiqueta: 'Transparencia' }
UNION ALL
SELECT 'Transparencia', 2, 'Informacion', NULL, NULL
-- { id: 4, Etiqueta: 'Avisos de Privacidad' }
UNION ALL
SELECT 'Avisos de Privacidad', 2, 'Menu Informacion', 5, NULL
-- { id: 5, Etiqueta: 'Mejora Regulatoria' }
UNION ALL
SELECT 'Mejora Regulatoria', 2, 'Informacion', NULL, NULL
-- { id: 6, Etiqueta: 'Servicios en línea' }
UNION ALL
SELECT 'Servicios en Linea', 2, 'Informacion', NULL, NULL


-- { 3: 'Links' }
-- HIJOS
-- { id: 2, Etiqueta: 'Directorio' }
UNION ALL
SELECT 'Regidores', 3, 'Link Informacion', 2, 'https://atizapan.gob.mx/regidores/' -- { Etiqueta: 'Regidores' }
UNION ALL
SELECT 'Directores', 3, 'Link Informacion', 2, 'https://atizapan.gob.mx/directores/' -- { Etiqueta: 'Directores' }


-- { id: 3, Etiqueta: 'Transparencia' }
UNION ALL
SELECT 'Saimex', 3, 'Link Informacion', 3, 'https://saimex.org.mx/saimex/ciudadano/login.page' -- { Etiqueta: 'Saimex' }
UNION ALL
SELECT 'Registro de unidades economicas', 3, 'Link Informacion', 3, 'https://atizapan.gob.mx/wp-content/uploads/2021/03/Unidades-economicas-septiembre-actual-30-03-21.pdf' -- { Etiqueta: 'Registro de unidades economicas' }
UNION ALL
SELECT 'Sarcoem', 3, 'Link Informacion', 3, 'https://www.sarcoem.org.mx/sarcoem/ciudadano/login.page' -- { Etiqueta: 'Sarcoem' }
UNION ALL
SELECT 'Registro de denuncias', 3, 'Link Informacion', 3, 'https://www.transparenciaestadodemexico.org.mx/denciu/denuncia/insert.page' -- { Etiqueta: 'Registro de denuncias' }
UNION ALL
SELECT 'Programa Anual de Evaluacion', 3, 'Link Informacion', 3, 'https://atizapan.gob.mx/programa-anual-de-evaluacion/' -- { Etiqueta: 'Programa Anual de Evaluación' }
UNION ALL
SELECT 'Cuenta  Publica', 3, 'Link Informacion', 3, 'https://atizapan.gob.mx/fism-fortamun-conac/' -- { Etiqueta: 'Cuenta Pública' }
UNION ALL
SELECT 'INFOEM', 3, 'Link Informacion', 3, 'https://www.infoem.org.mx/' -- { Etiqueta: 'INFOEM' }
UNION ALL
SELECT 'Bando 2022', 3, 'Link Informacion', 3, 'https://atizapan.gob.mx/wp-content/uploads/2022/02/BANDO-2022-BYN.pdf' -- { Etiqueta: 'Bando 2022' }
UNION ALL
SELECT 'Actas y gacetas', 3, 'Link Informacion', 3, 'https://atizapan.gob.mx/actas-y-gacetas3/' -- { Etiqueta: 'Actas y gacetas' }
UNION ALL
SELECT 'CONAC', 3, 'Link Informacion', 3, 'https://atizapan.gob.mx/conac/' -- { Etiqueta: 'CONAC' }
UNION ALL
SELECT 'IPOMEX', 3, 'Link Informacion', 3, 'https://www.ipomex.org.mx/ipo3/lgt/indice/atizapandezaragoza.web' -- { Etiqueta: 'IPOMEX' }
UNION ALL
SELECT 'Manual al sistema IPOMEX', 3, 'Link Informacion', 3, 'https://atizapan.gob.mx/manual-al-sistema-ipomex/' -- { Etiqueta: 'Manual al sistema IPOMEX' }


-- { id: 4, Etiqueta: 'Avisos de Privacidad' }
UNION ALL
SELECT 'Avisos de privacidad de tesoreria', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1659027685883-8add730e-ac92' -- { Etiqueta: 'Avisos de privacidad de tesoreria' }
UNION ALL
SELECT 'Avisos de privacidad de Sipinna', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1659027896817-abdce76c-ba4d' -- { Etiqueta: 'Avisos de privacidad de SIPINNA' }
UNION ALL
SELECT 'Avisos de privacidad de servicios publicos', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1659028215096-93cbfa02-50e4' -- { Etiqueta: 'Avisos de privacidad de servicios publicos' }
UNION ALL
SELECT 'Avisos de privacidad de seguridad publica', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1659028414368-bf49ec65-f708' -- { Etiqueta: 'Avisos de privacidad de seguridad publica' }
UNION ALL
SELECT 'Avisos de privacidad de secretaria del ayuntamiento', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1659028641579-af24be08-1018' -- { Etiqueta: 'Avisos de privacidad de secretaria del ayuntamiento' }
UNION ALL
SELECT 'Avisos de privacidad de oficina de presidencia', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1659029226966-4afb1ccd-7d0f' -- { Etiqueta: 'Avisos de privacidad de oficina de presidencia' }
UNION ALL
SELECT 'Avisos de privacidad de obras publicas', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1659029330949-3d636a8c-e074' -- { Etiqueta: 'Avisos de privacidad de obras publicas' }
UNION ALL
SELECT 'Avisos de privacidad de instituto de la mujer', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1659029387185-777f6e44-4132' -- { Etiqueta: 'Avisos de privacidad de instituto de la mujer' }
UNION ALL
SELECT 'Avisos de privacidad de mejora regulatoria', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1659030151137-5002eadb-d8b5' -- { Etiqueta: 'Avisos de privacidad de mejora regulatoria' }
UNION ALL
SELECT 'Avisos de privacidad de juventud', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1659030204011-f2c8fa54-b497' -- { Etiqueta: 'Avisos de privacidad de juventud' }
UNION ALL
SELECT 'Avisos de privacidad de juridico y consultivo', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1659030373284-f905c514-6f7a' -- { Etiqueta: 'Avisos de privacidad de juridico y consultivo' }
UNION ALL
SELECT 'Avisos de privacidad de innovacion y comunicacion', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1659030551426-425f171f-53c3' -- { Etiqueta: 'Avisos de privacidad de innovacion y comunicacion' }
UNION ALL
SELECT 'Avisos de privacidad de educacion', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1659030587271-830d1230-0c5f' -- { Etiqueta: 'Avisos de privacidad de educacion' }
UNION ALL
SELECT 'Avisos de privacidad de desarrollo economico', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1659030789646-342afdaa-c581' -- { Etiqueta: 'Avisos de privacidad de desarrollo economico' }
UNION ALL
SELECT 'Avisos de privacidad de desarrollo social', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1659031104087-4d042f27-8c6f' -- { Etiqueta: 'Avisos de privacidad de desarrollo social' }
UNION ALL
SELECT 'Avisos de privacidad de derechos humanos', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1659031545252-02a85e8a-2ad8' -- { Etiqueta: 'Avisos de privacidad de derechos humanos' }
UNION ALL
SELECT 'Avisos de privacidad de proteccion civil, bomberos y medio ambiente', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1663878134737-80774131-caa3' -- { Etiqueta: 'Avisos de privacidad de proteccion civil, bomberos y medio ambiente' }
UNION ALL
SELECT 'Avisos de privacidad ordenamiento territorial y desarrollo urbano', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1663879221744-b2550e1e-7de7' -- { Etiqueta: 'Avisos de privacidad de ordenamiento territorial y desarrollo urbano' }
UNION ALL
SELECT 'Avisos de privacidad sindicatura', 3, 'Link Informacion', 4, 'https://atizapan.gob.mx/avisos-de-privacidad/#1664310925132-18b66a74-1e45' -- { Etiqueta: 'Avisos de privacidad sindicatura' }


-- { id: 5, Etiqueta: 'Mejora Regulatoria' }
UNION ALL
SELECT 'Catalogo municipal de regulaciones', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/catalogo-municipal-de-regulaciones/' -- { Etiqueta: 'Catalogo municipal de regulaciones' }
UNION ALL
SELECT 'Catalogo municipal de tramites y servicios', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/catalogo-municipal-de-tramites-y-servicios/' -- { Etiqueta: 'Catalogo municipal de tramites y servicios' }
UNION ALL
SELECT 'Registro Municipal de Inspectores, Visitadores y Verificadores', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/inspectores-visitadores-y-verificadores/' -- { Etiqueta: 'Catalogo municipal de tramites y servicios' }
UNION ALL
SELECT 'Agenda Regulatoria', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/inspectores-visitadores-y-verificadores/' -- { Etiqueta: 'Agenda Regulatoria' }
UNION ALL
SELECT 'Protesta Ciudadana', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/protesta-ciudadana-2/' -- { Etiqueta: 'Protesta Ciudadana' }
-- Consulta Pública
UNION ALL
SELECT 'Agenda Regulatoria del primer periodo 2022', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/wp-content/uploads/2022/06/AGENDA-REGULATORIA-DEL-PRIMER-PERIODO-2022.pdf' -- { Etiqueta: 'Agenda Regulatoria del primer periodo 2022' }
UNION ALL
SELECT 'Lineamientos de operacion para el uso y disfrute de los modulos PREP', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/wp-content/uploads/2022/06/LINEAMIENTOS-DE-OPERACION-DE-LOS-MODULOS-PREP.pdf' -- { Etiqueta: 'Lineamientos de operacion para el uso y disfrute de los modulos PREP' }
UNION ALL
SELECT 'Reglamento Municipal de Dictamenes de Giro de Atizapan de Zaragoza', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/wp-content/uploads/2022/07/REGLAMENTO-MUNICIPAL-DE-DICTAMENES-DE-GIRO-DE-A.Z.-1.pdf' -- { Etiqueta: 'Reglamento Municipal de Dictamenes de Giro de Atizapan de Zaragoza' }
-- Publicaciones
UNION ALL
SELECT 'Segundo reporte trimestral avance del programa anual', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/wp-content/uploads/2022/08/SEGUNDO-REPORTE-TIMESTRAL-AVANCE-DEL-PROGRAMA-ANUAL.pdf' -- { Etiqueta: 'Segundo reporte trimestral avance del programa anual' }
UNION ALL
SELECT 'Programa anual municipal de mejora regulatoria 2022', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/wp-content/uploads/2022/05/PROGRAMA-ANUAL-MUNICIPAL-DE-MEJORA-REGULATORIA-2022-1.pdf' -- { Etiqueta: 'Programa anual municipal de mejora regulatoria 2022' }
UNION ALL
SELECT 'Acta de instalacion municipal de mejora regulatoria', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/wp-content/uploads/2022/03/Acta-Constitutiva-de-la-Comision-de-Mejora-Regulatoria-25-de-enero_compressed.pdf' -- { Etiqueta: 'Acta de instalacion municipal de mejora regulatoria' }
UNION ALL
SELECT 'Actas de integracion de los comites internos', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/actas-de-integracion-de-los-comites-internos/' -- { Etiqueta: 'Actas de integracion de los comites internos' }
UNION ALL
SELECT 'Acta de la primera sesion ordinaria de la comision municipal de mejora regulatoria 2022', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/wp-content/uploads/2022/05/ACTA-DE-LA-PRIMERA-SESION-ORDINARIA-DE-LA-CMMR2022.pdf' -- { Etiqueta: 'Acta de la primera sesion ordinaria de la comision municipal de mejora regulatoria 2022' }
UNION ALL
SELECT 'Acta de la primera sesion extraordinaria de la comision municipal de mejora regulatoria 2022', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/wp-content/uploads/2022/05/ACTA-DE-LA-PRIMERA-SESION-EXTRAORDINARIA-DE-LA-CMMR2022.pdf' -- { Etiqueta: 'Acta de la primera sesion extraordinaria de la comision municipal de mejora regulatoria 2022' }
UNION ALL
SELECT 'Acta segunda sesion extraordinaria de la comision municipal de mejora regulatoria', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/wp-content/uploads/2022/08/Acta-Segunda-Sesion-Extraordinaria-CMMR_0001.pdf' -- { Etiqueta: 'Acta segunda sesion extraordinaria de la comision municipal de mejora regulatoria' }
UNION ALL
SELECT 'Primer reporte trimestral de avance del programa anual', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/wp-content/uploads/2022/06/PRIMER-REPORTE-TRIMESTRAL-DE-AVANCE-DE-PROGRAMA-ANUAL.pdf' -- { Etiqueta: 'Primer reporte trimestral de avance del programa anual' }
UNION ALL
SELECT 'Segundo reporte trimestral de avance del programa anual', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/wp-content/uploads/2022/08/SEGUNDO-REPORTE-TIMESTRAL-AVANCE-DEL-PROGRAMA-ANUAL.pdf' -- { Etiqueta: 'Segundo reporte trimestral de avance del programa anual' }
UNION ALL
SELECT 'Formatos 2RTAPA', 3, 'Link Informacion', 5, 'https://atizapan.gob.mx/wp-content/uploads/2022/06/FORMATOS-2RTAPA.pdf' -- { Etiqueta: 'Formatos 2RTAPA' }


-- { id: 6, Etiqueta: 'Servicios en línea' }
UNION ALL
SELECT 'CAE', 3, 'Link Informacion', 6, 'https://atizapancae.mx/' -- { Etiqueta: 'CAE' }
UNION ALL
SELECT 'Tesoreria Digital', 3, 'Link Informacion', 6, 'https://tesoreriadigitalat.com:444/' -- { Etiqueta: 'Tesoreria Digital' }
UNION ALL
SELECT 'Atizapan te escucha', 3, 'Link Informacion', 6, 'https://www.atizapan.gob.mx/atizapanteescucha/' -- { Etiqueta: 'Atizapan te escucha' }
UNION ALL
SELECT 'Cita constancias de identidad y constancias de vecindad', 3, 'Link Informacion', 6, 'https://bus.edomex.gob.mx/decaflow/constancias/ext_vue/bienvenida.php' -- { Etiqueta: 'Cita constancias de identidad y constancias de vecindad' }


-- HOJAS
-- { Etiqueta: 'Licitaciones y Convocatorias' }
UNION ALL
SELECT 'Licitaciones y Convocatorias', 3, 'Link Informacion', NULL, 'https://atizapan.gob.mx/licitaciones-y-convocatorias/'
-- { Etiqueta: 'Desarrollo Urbano' }
UNION ALL
SELECT 'Desarrollo Urbano', 3, 'Link Informacion', NULL, 'https://atizapan.gob.mx/desarrollo-urbano/'
-- { Etiqueta: 'EDICTO' }
UNION ALL
SELECT 'EDICTO', 3, 'Link Informacion', NULL, 'https://atizapan.gob.mx/wp-content/uploads/2022/03/edicto.pdf'
-- { Etiqueta: 'SARE' }
UNION ALL
SELECT 'SARE', 3, 'Link Informacion', NULL, 'https://atizapan.gob.mx/sare/'
-- { Etiqueta: 'Medio Ambiente' }
UNION ALL
SELECT 'Medio Ambiente', 2, 'Link Informacion', NULL, 'https://atizapan.gob.mx/wp-content/uploads/2022/09/medio-ambiente-1.pdf'
-- { Etiqueta: 'Proceso competitivo credito corto plazo' }
UNION ALL
SELECT 'Proceso competitivo credito corto plazo', 3, 'Link Informacion', NULL, 'https://atizapan.gob.mx/proceso-competitivo-credito-corto-plazo/'


SELECT * 
FROM dbo.Interaccion



--###################
--#  Tabla: Patron  #
--###################

-- Id_Interaccion (int), Respuesta (varchar)

INSERT INTO dbo.Patron

-- { id: 1, Etiqueta: Saludo }
SELECT 1, 'Hola' 
UNION ALL
SELECT 1, 'Que tal' 
UNION ALL
SELECT 1, 'En que te puedo ayudar?' 
UNION ALL


-- { id: 2, Etiqueta: 'Directorio' }
SELECT 2, 'Ponemos a tu alcance la siguiente informacion sobre directorios:\n
1. Regidores\n
2. Directores\n
\nSelecciona una opcion:' 
UNION ALL


-- { id: 3, Etiqueta: 'Transparencia' }
SELECT 3, 'Ponemos a tu alcance la siguiente informacion sobre transparencia:\n
1. Avisos de privacidad\n
2. SAIMEX\n
3. Registro de unidades economicas\n
4. SARCOEM\n
5. Programa anual de evaluacion\n
6. Cuenta publica\n
7. INFOEM\n
8. Bando 2022\n
9. Actas y gacetas\n
10. CONAC\n
11. IPOMEX\n
12. Manual al sistema IPOMEX\n
\nSeleccione una opcion:' 
UNION ALL


-- { id: 4, Etiqueta: 'Aviso de privacidad' }
SELECT 4, 'A continuacion los siguientes avisos de privacidad:\n
1. Avisos de privacidad de tesoreria\n
2. Avisos de privacidad de Sipinna\n
3. Avisos de privacidad de servicios publicos\n
4. Avisos de privacidad de seguridad publica\n
5. Avisos de privacidad de secretaria del ayuntamiento\n
6. Avisos de privacidad de oficina de presidencia\n
7. Avisos de privacidad de obras publicas\n
8. Avisos de privacidad de instituto de la mujer\n
9. Avisos de privacidad de mejora regulatoria\n
10. Avisos de privacidad de juventud\n
11. Avisos de privacidad de juridico y consultivo\n
12. Avisos de privacidad de innovacion y comunicacion\n
13. Avisos de privacidad de educacion\n
14. Avisos de privacidad de desarrollo economico\n
15. Avisos de privacidad de desarrollo social\n
16. Avisos de privacidad de derechos humanos\n
17. Avisos de privacidad de proteccion civil, bomberos y medio ambiente\n
18. Avisos de privacidad ordenamiento territorial y desarrollo urbano\n
19. Avisos de privacidad sindicatura\n
\nSelecciona una opcion:'
UNION ALL


-- { id: 5, Etiqueta: 'Mejora Regulatoria' }
SELECT 5, 'Ponemos a tu alcance la siguiente informacion sobre mejora regulatoria:\n
1. Catalogo municipal de regulaciones\n
2. Catalogo municipal de tramites y servicios\n
3. Registro Municipal de Inspectores, Visitadores y Verificadores\n
4. Agenda Regulatoria\n
5. Protesta Ciudadana\n
6. Agenda Regulatoria del primer periodo 2022\n
7. Lineamientos de operacion para el uso y disfrute de los modulos PREP\n
8. Reglamento Municipal de Dictamenes de Giro de Atizapan de Zaragoza\n
9. Segundo reporte trimestral avance del programa anual\n
10. Programa anual municipal de mejora regulatoria 2022\n
11. Acta de instalacion municipal de mejora regulatoria\n
12. Actas de integracion de los comites internos\n
13. Acta de la primera sesion extraordinaria de la comision municipal de mejora regulatoria 2022\n
14. Acta segunda sesion extraordinaria de la comision municipal de mejora regulatoria\n
15. Primer reporte trimestral de avance del programa anual\n
16. Segundo reporte trimestral de avance del programa anual\n
17. Formatos 2RTAPA\n
\nSelecciona una opcion:' 
UNION ALL


-- { id: 6, Etiqueta: 'Servicios en línea' }
SELECT 6, 'Una lista de los servicios en línea que ofrecemos:\n
1. CAE\n
2. Tesoreria digital\n
3. Atizapan te escucha\n
4. Cita Constancias de Identidad y Constancias de Vecindad\n
\nSelecciona una opcion:'
UNION ALL


-- { id: 7, Etiqueta: 'Hojas' }
SELECT 7, 'Ponemos a tu alcance la siguiente informacion:\n
1. Licitaciones y Convocatorias\n
2. Desarrollo Urbano\n
3. EDICTO\n
4. SARE\N
5. Medio Ambiente\n
6. Proceso competitivo credito corto plazo\n
\nSelecciona una opcion:' 
UNION ALL


-- { id: 8, Etiqueta: 'Link' }
SELECT 8, 'Link a continuacion' 
UNION ALL
SELECT 8, 'Link' 
UNION ALL
SELECT 8, 'Enlace a continuacion' 
UNION ALL
SELECT 8, 'Enlace' 
UNION ALL
SELECT 8, 'URL a continuacion' 
UNION ALL
SELECT 8, 'URL' 
UNION ALL
SELECT 8, 'Dirijase a la siguiente pagina' 
UNION ALL
SELECT 8, 'Siga la siguiente ruta' 
UNION ALL
SELECT 8, 'Abrir enlace' 
UNION ALL
SELECT 8, 'Abrir link' 
UNION ALL
SELECT 8, 'Abrir ruta' 
UNION ALL
SELECT 8, 'Abrir URL' 
UNION ALL


-- Query
SELECT P.Id, I.Etiqueta, P.Id_interaccion, P.Patron
FROM dbo.Patron P
INNER JOIN dbo.Interaccion I ON P.Id_interaccion = I.Id
ORDER BY P.Id_interaccion


-- ######################
-- #  Tabla: Respuesta  #
-- ######################

-- Id_Interaccion (int), Respuesta (varchar)

INSERT INTO dbo.Respuesta

-- { id: 1, Etiqueta: Saludo }
SELECT 1, 'Hola' 
UNION ALL
SELECT 1, 'Que tal' 
UNION ALL
SELECT 1, 'Buenas' 
UNION ALL


-- { id: 2, Etiqueta: 'Directorio' }
SELECT 2, 'Directorio' 
UNION ALL
SELECT 3, 'Regidores' -- { Etiqueta: 'Regidores' }
UNION ALL
SELECT 4, 'Directores' -- { Etiqueta: 'Directores' } 
UNION ALL


-- { id: 3, Etiqueta: 'Transparencia' }
SELECT 5, 'Transparencia' -- { Etiqueta: 'Transparencia' }
UNION ALL
SELECT 6, 'Avisos de privacidad' -- { Etiqueta: 'Avisos de privacidad' }
UNION ALL
SELECT 7, 'SAIMEX' -- { Etiqueta: 'SAIMEX' } 
UNION ALL
SELECT 8, 'Registro de unidades economicas' -- { Etiqueta: 'Registro de unidades económicas' } 
UNION ALL
SELECT 9, 'SARCOEM' -- { Etiqueta: 'SARCOEM' } 
UNION ALL
SELECT 10, 'Programa anual de evaluacion' -- { Etiqueta: 'Programa anual de evaluación' } 
UNION ALL
SELECT 11, 'Cuenta publica' -- { Etiqueta: 'Cuenta pública' } 
UNION ALL
SELECT 12, 'INFOEM' -- { Etiqueta: 'INFOEM' } 
UNION ALL
SELECT 13, 'Bando 2022' -- { Etiqueta: 'Bando 2022' } 
UNION ALL
SELECT 14, 'Actas y gacetas' -- { Etiqueta: 'Actas y gacetas' } 
UNION ALL
SELECT 15, 'CONAC' -- { Etiqueta: 'CONAC' } 
UNION ALL
SELECT 16, 'IPOMEX' -- { Etiqueta: 'IPOMEX' } 
UNION ALL
SELECT 17, 'Manual al sistema IPOMEX' -- { Etiqueta: 'Manual al sistema IPOMEX' } 
UNION ALL


-- { id: 4, Etiqueta: 'Aviso de privacidad' }
SELECT 18, 'Avisos de privacidad' -- { Etiqueta: 'Aviso de privacidad' }
UNION ALL
SELECT 19, 'Avisos de privacidad de tesoreria' --{Etiqueta: 'Avisos de privacidad de tesorería'}
UNION ALL
SELECT 20, 'Avisos de privacidad de Sipinna' --{Etiqueta: 'Avisos de privacidad de Sipinna'}
UNION ALL
SELECT 21, 'Avisos de privacidad de servicios publicos' --{Etiqueta: 'Avisos de privacidad de servicios públicos'}
UNION ALL
SELECT 22, 'Avisos de privacidad de seguridad publica' --{Etiqueta: 'Avisos de privacidad de seguridad pública'}
UNION ALL
SELECT 23, 'Avisos de privacidad de secretaria del ayuntamiento' --{Etiqueta: 'Avisos de privacidad de secretaría del ayuntamiento'}
UNION ALL
SELECT 24, 'Avisos de privacidad de oficina de presidencia' --{Etiqueta: 'Avisos de privacidad de oficina de presidencia'}
UNION ALL
SELECT 25, 'Avisos de privacidad de obras publicas' --{Etiqueta: 'Avisos de privacidad de obras públicas'}
UNION ALL
SELECT 26, 'Avisos de privacidad de instituto de la mujer' --{Etiqueta: 'Avisos de privacidad de instituto de la mujer'}
UNION ALL
SELECT 27, 'Avisos de privacidad de mejora regulatoria' --{Etiqueta: 'Avisos de privacidad de mejora regulatoria'}
UNION ALL
SELECT 28, 'Avisos de privacidad de juventud' --{Etiqueta: 'Avisos de privacidad de juventud'}
UNION ALL
SELECT 29, 'Avisos de privacidad de juridico y consultivo' --{Etiqueta: 'Avisos de privacidad de jurídico y consultivo'}
UNION ALL
SELECT 30, 'Avisos de privacidad de innovacion y comunicacion' --{Etiqueta: 'Avisos de privacidad de innovación y comunicación'}
UNION ALL
SELECT 31, 'Avisos de privacidad de educacion' --{Etiqueta: 'Avisos de privacidad de educación'}
UNION ALL
SELECT 32, 'Avisos de privacidad de desarrollo economico' --{Etiqueta: 'Avisos de privacidad de desarrollo económico'}
UNION ALL
SELECT 33, 'Avisos de privacidad de desarrollo social' --{Etiqueta: 'Avisos de privacidad de desarrollo social'}
UNION ALL
SELECT 34, 'Avisos de privacidad de derechos humanos' --{Etiqueta: 'Avisos de privacidad de derechos humanos'}
UNION ALL
SELECT 35, 'Avisos de privacidad de protección civil, bomberos y medio ambiente' --{Etiqueta: 'Avisos de privacidad de protección civil, bomberos y medio ambiente'}
UNION ALL
SELECT 36, 'Avisos de privacidad ordenamiento territorial y desarrollo urbano' --{Etiqueta: 'Avisos de privacidad ordenamiento territorial y desarrollo urbano'}
UNION ALL
SELECT 37, 'Avisos de privacidad sindicatura' --{Etiqueta: 'Avisos de privacidad sindicatura'}
UNION ALL


-- { id: 5, Etiqueta: 'Mejora Regulatoria' }
SELECT 38, 'Mejora Regulatoria' 
UNION ALL
SELECT 39, 'Catalogo municipal de regulaciones' -- { Etiqueta: 'Catalogo municipal de regulaciones' }
UNION ALL
SELECT 40, 'Catalogo municipal de tramites y servicios' -- { Etiqueta: 'Catalogo municipal de tramites y servicios' } 
UNION ALL
SELECT 41, 'Registro Municipal de Inspectores, Visitadores y Verificadores' -- { Etiqueta: Registro Municipal de Inspectores, Visitadores y Verificadores }
UNION ALL
SELECT 42, 'Agenda Regulatoria' -- { Etiqueta: 'Agenda Regulatoria' }
UNION ALL
SELECT 43, 'Protesta Ciudadana' -- { Etiqueta: 'Protesta Ciudadana' } 
UNION ALL
SELECT 44, 'Agenda Regulatoria del primer periodo 2022' -- { Etiqueta: 'Agenda Regulatoria del primer periodo 2022' } 
UNION ALL
SELECT 45, 'Lineamientos de operacion para el uso y disfrute de los modulos PREP' -- { Etiqueta: 'Lineamientos de operacion para el uso y disfrute de los modulos PREP' }
UNION ALL
SELECT 46, 'Reglamento Municipal de Dictamenes de Giro de Atizapan de Zaragoza' -- { Etiqueta: 'Reglamento Municipal de Dictamenes de Giro de Atizapan de Zaragoza' } 
UNION ALL
SELECT 47, 'Segundo reporte trimestral avance del programa anual' -- { Etiqueta: 'Segundo reporte trimestral avance del programa anual' } 
UNION ALL
SELECT 48, 'Programa anual municipal de mejora regulatoria 2022' -- { Etiqueta: 'Programa anual municipal de mejora regulatoria 2022' }
UNION ALL
SELECT 49, 'Acta de instalacion municipal de mejora regulatoria' -- { Etiqueta: 'Acta de instalacion municipal de mejora regulatoria' } 
UNION ALL
SELECT 50, 'Actas de integracion de los comites internos' -- { Etiqueta: 'Actas de integracion de los comites internos' }
UNION ALL
SELECT 51, 'Acta de la primera sesion extraordinaria de la comision municipal de mejora regulatoria 2022' -- { Etiqueta: 'Acta de la primera sesion extraordinaria de la comision municipal de mejora regulatoria 2022' } 
UNION ALL
SELECT 52, 'Acta segunda sesion extraordinaria de la comision municipal de mejora regulatoria' -- { Etiqueta: 'Acta segunda sesion extraordinaria de la comision municipal de mejora regulatoria' }
UNION ALL
SELECT 53, 'Primer reporte trimestral de avance del programa anual' -- { Etiqueta: 'Primer reporte trimestral de avance del programa anual' } 
UNION ALL
SELECT 54, 'Segundo reporte trimestral de avance del programa anual' -- { Etiqueta: 'Segundo reporte trimestral de avance del programa anual' } 
UNION ALL
SELECT 55, 'Formatos 2RTAPA' -- { Etiqueta: 'Formatos 2RTAPA' } 
UNION ALL


-- { id: 6, Etiqueta: 'Servicios en línea' }
SELECT 56, 'Servicios en linea'
UNION ALL
SELECT 57, 'CAE'  --{Etiqueta: 'CAE'}
UNION ALL
SELECT 58, 'Tesoreria digital' --{Etiqueta: 'Tesorería digital'}
UNION ALL
SELECT 59, 'Atizapan te escucha' --{Etiqueta: 'Atizapán te escucha'}
UNION ALL
SELECT 60, 'Cita Constancias de Identidad y Constancias de Vecindad' --{Etiqueta: 'Cita Constancias de Identidad y Constancias de Vecindad'}
UNION ALL


-- { id: 7, Etiqueta: 'Hojas' }
SELECT 61, 'Hojas' -- { Etiqueta: 'Hojas' } 
UNION ALL
SELECT 62, 'Licitaciones y Convocatorias' -- { Etiqueta: 'Licitaciones y Convocatorias' } 
UNION ALL
SELECT 63, 'Desarrollo Urbano' -- { Etiqueta: 'Desarrollo Urbano' } 
UNION ALL
SELECT 64, 'EDICTO' -- { Etiqueta: 'EDICTO' } 
UNION ALL
SELECT 65, 'SARE' -- { Etiqueta: 'SARE' } 
UNION ALL
SELECT 66, 'Medio Ambiente' -- { Etiqueta: 'Medio Ambiente' } 
UNION ALL
SELECT 67, 'Proceso competitivo credito corto plazo' -- { Etiqueta: 'Proceso competitivo credito corto plazo' } 
UNION ALL


-- Query
SELECT R.Id,I.Etiqueta,R.Id_interaccion,R.Respuesta
FROM dbo.Respuesta R
INNER JOIN dbo.Interaccion I ON R.Id_interaccion = I.Id
ORDER BY R.Id_interaccion