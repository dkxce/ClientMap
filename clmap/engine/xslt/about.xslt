<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="ClientMap/Assembly">
		
		<center>
			<br/>
			<b><xsl:value-of select="Title"/> v<xsl:value-of select="Version"/></b> (<xsl:value-of select="Description"/>)<br/>
			<sup>
				<xsl:value-of select="VersionDate"/>
			</sup><br/><br/>
			<span style="font-size:12px;color:666666;">Map/JS Framework by Milok Zbrozek</span>
			<br/>
			<span style="font-size:12px;color:#A0A0A0;">Engine architecture &amp; development by 
				<xsl:value-of select="Author"/>
			</span>
		</center>

</xsl:template>
</xsl:stylesheet> 