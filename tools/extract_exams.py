import sys, zipfile
from xml.etree import ElementTree as ET

W='{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
M='{http://schemas.openxmlformats.org/officeDocument/2006/math}'

def math_text(elem):
    s=''
    if elem.tag==M+'t' and elem.text:
        s+=elem.text
    for c in elem:
        s+=math_text(c)
    return s

def para_text(p):
    buf=[]
    def walk(node):
        for c in node:
            if c.tag==W+'t':
                if c.text: buf.append(c.text)
            elif c.tag==M+'oMath':
                buf.append(' ⟦'+math_text(c)+'⟧ ')
            elif c.tag==M+'oMathPara':
                for om in c:
                    buf.append(' ⟦'+math_text(om)+'⟧ ')
            else:
                walk(c)
    walk(p)
    return ''.join(buf).strip()

def extract(path):
    z=zipfile.ZipFile(path)
    root=ET.fromstring(z.read('word/document.xml'))
    body=root.find(W+'body')
    out=[]
    for p in body.findall('.//'+W+'p'):
        t=para_text(p)
        if t: out.append(t)
    return out

if __name__=='__main__':
    for path in sys.argv[1:]:
        print('\n'+'='*90)
        print('FILE:',path)
        print('='*90)
        for line in extract(path):
            print(line)
